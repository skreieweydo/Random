#!/usr/bin/env bash
# scripts/status.sh
# Compact project status: typecheck, tests, build, coverage, pack preview.
# Exits non-zero if any check fails. Works on macOS/Linux.

set -u  # (no -e; we want to continue after failures)

# ---------------------------------------------------------------------------
# UI helpers
# ---------------------------------------------------------------------------
if command -v tput >/dev/null 2>&1 && [ -t 1 ]; then
  BOLD="$(tput bold)"; DIM="$(tput dim)"; RESET="$(tput sgr0)"
  GREEN="$(tput setaf 2)"; RED="$(tput setaf 1)"; YELLOW="$(tput setaf 3)"
else
  BOLD=""; DIM=""; RESET=""; GREEN=""; RED=""; YELLOW=""
fi

ok()   { printf "%b✅ %s%b\n" "$GREEN" "$1" "$RESET"; }
fail() { printf "%b❌ %s%b\n" "$RED"   "$1" "$RESET"; }
info() { printf "%bℹ︎  %s%b\n" "$YELLOW" "$1" "$RESET"; }
hdr()  { printf "\n%b%s%b\n" "$BOLD" "$1" "$RESET"; }

# ---------------------------------------------------------------------------
# Config (override with env vars if you like)
# ---------------------------------------------------------------------------
COV_BRANCHES_MIN="${COV_BRANCHES_MIN:-100}"
COV_FUNCTIONS_MIN="${COV_FUNCTIONS_MIN:-100}"
COV_LINES_MIN="${COV_LINES_MIN:-100}"
COV_STATEMENTS_MIN="${COV_STATEMENTS_MIN:-100}"

# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT" || exit 2

STAMP="$(date -u +"%Y-%m-%d %H:%M:%S UTC")"
PACK_LOG="${TMPDIR:-/tmp}/random-pack.$$.log"
SUMMARY_LOG="${TMPDIR:-/tmp}/random-status.$$.log"
: > "$PACK_LOG"
: > "$SUMMARY_LOG"

STATUS=0
run() {
  local name="$1"; shift
  local cmd="$*"
  # shellcheck disable=SC2086
  if bash -lc "$cmd" >>"$SUMMARY_LOG" 2>&1; then
    ok "$name"
  else
    fail "$name"
    STATUS=1
  fi
}

# ---------------------------------------------------------------------------
# Banner
# ---------------------------------------------------------------------------
hdr "Random project status — $STAMP"
info "Repo: $REPO_ROOT"

# ---------------------------------------------------------------------------
# Environment snapshot
# ---------------------------------------------------------------------------
hdr "Environment"
if command -v node >/dev/null 2>&1; then
  echo "node: $(node -v)"
else
  echo "node: (not found)"; STATUS=1
fi
if command -v npm >/dev/null 2>&1; then
  echo "npm:  $(npm -v)"
else
  echo "npm:  (not found)"; STATUS=1
fi
if [ -f node_modules/typescript/package.json ]; then
  TS_VER="$(node -p "require('./node_modules/typescript/package.json').version" 2>/dev/null || echo '?')"
  echo "tsc:  $TS_VER"
else
  echo "tsc:  (typescript not installed locally)"
fi

# ---------------------------------------------------------------------------
# Checks
# ---------------------------------------------------------------------------
hdr "Checks"
run "Typecheck" "npm run -s typecheck"
run "Tests"     "npm test --silent"
run "Build"     "npm run -s build"
# ---------------------------------------------------------------------------
# Coverage (fresh run, print numbers, enforce thresholds via Node)
# ---------------------------------------------------------------------------
hdr "Coverage"

rm -rf coverage

if npx jest --coverage --silent >>"$SUMMARY_LOG" 2>&1; then
  ok "Jest coverage run"
else
  fail "Jest coverage run"
  STATUS=1
fi

# Node-side parsing & thresholding (supports summary or final JSON)
node - <<'NODE'
const fs = require('fs');

const SUMMARY = 'coverage/coverage-summary.json';
const FINAL   = 'coverage/coverage-final.json';

function computeTotalsFromFinal(fp) {
  const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
  const files = Object.values(data);
  const zero = {
    branches:   { covered: 0, total: 0 },
    functions:  { covered: 0, total: 0 },
    lines:      { covered: 0, total: 0 },
    statements: { covered: 0, total: 0 },
  };
  const tot = files.reduce((a, m) => ({
    branches:   { covered: a.branches.covered   + ((m.branches   && m.branches.covered)   || 0),
                  total:   a.branches.total     + ((m.branches   && m.branches.total)     || 0) },
    functions:  { covered: a.functions.covered  + ((m.functions  && m.functions.covered)  || 0),
                  total:   a.functions.total    + ((m.functions  && m.functions.total)    || 0) },
    lines:      { covered: a.lines.covered      + ((m.lines      && m.lines.covered)      || 0),
                  total:   a.lines.total        + ((m.lines      && m.lines.total)        || 0) },
    statements: { covered: a.statements.covered + ((m.statements && m.statements.covered) || 0),
                  total:   a.statements.total   + ((m.statements && m.statements.total)   || 0) },
  }), zero);
  const pct = k => tot[k].total ? (tot[k].covered / tot[k].total * 100) : 0;
  return {
    branches:   { pct: +pct('branches').toFixed(2) },
    functions:  { pct: +pct('functions').toFixed(2) },
    lines:      { pct: +pct('lines').toFixed(2) },
    statements: { pct: +pct('statements').toFixed(2) },
  };
}

let total;
if (fs.existsSync(SUMMARY)) {
  const s = JSON.parse(fs.readFileSync(SUMMARY, 'utf8'));
  total = s.total || s;
} else if (fs.existsSync(FINAL)) {
  total = computeTotalsFromFinal(FINAL);
} else {
  console.error('coverage json not found (looked for coverage-summary.json and coverage-final.json)');
  process.exit(2);
}

const pct = {
  branches:   Number(total && total.branches   && total.branches.pct)   || 0,
  functions:  Number(total && total.functions  && total.functions.pct)  || 0,
  lines:      Number(total && total.lines      && total.lines.pct)      || 0,
  statements: Number(total && total.statements && total.statements.pct) || 0,
};

function env(k, d) { return process.env[k] ? Number(process.env[k]) : d; }
const min = {
  branches:   env('COV_BRANCHES_MIN',   100),
  functions:  env('COV_FUNCTIONS_MIN',  100),
  lines:      env('COV_LINES_MIN',      100),
  statements: env('COV_STATEMENTS_MIN', 100),
};

function fmt(n) { return Number.isFinite(n) ? (n + '%') : '?%'; }
console.log('branches: ' + fmt(pct.branches) +
            ' | functions: ' + fmt(pct.functions) +
            ' | lines: ' + fmt(pct.lines) +
            ' | statements: ' + fmt(pct.statements));

let bad = 0;
['branches','functions','lines','statements'].forEach(k => {
  const ok = Number.isFinite(pct[k]) && pct[k] >= min[k];
  const mark = ok ? '✅' : '❌';
  console.log(mark + ' Coverage ' + k + ' ' + (ok ? '\u2265' : '<') + ' ' + min[k] + '% (' + fmt(pct[k]) + ')');
  if (!ok) bad = 1;
});
process.exit(bad);
NODE

COV_RC=$?
[ $COV_RC -ne 0 ] && STATUS=1
# ---------------------------------------------------------------------------
# Artifacts sanity
# ---------------------------------------------------------------------------
hdr "Artifacts"
ART_OK=1
for f in "dist/index.js" "dist/index.d.ts"; do
  if [ -f "$f" ]; then ok "exists: $f"; else fail "missing: $f"; ART_OK=0; fi
done
if node -e "const p=require('./package.json'); process.exit(p.exports?0:1)" 2>/dev/null; then
  ok "package.json: exports present"
else
  info "package.json: no exports field found (skip)"
fi
[ $ART_OK -eq 1 ] || STATUS=1

# ---------------------------------------------------------------------------
# Git cleanliness
# ---------------------------------------------------------------------------
hdr "Git"
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  if git diff --quiet && git diff --cached --quiet; then
    ok "Working tree clean"
  else
    info "Working tree has changes (this is fine if intentional)"
  fi
else
  info "Not a git repo (skip)"
fi

# ---------------------------------------------------------------------------
# Pack contents (summary)
# ---------------------------------------------------------------------------
hdr "Pack contents (summary)"
if grep -q "Tarball Contents" "$PACK_LOG"; then
  awk '/Tarball Contents/{flag=1;print;next}/Tarball Details/{flag=0}flag' "$PACK_LOG" | sed 's/^/  /'
else
  tail -n 40 "$PACK_LOG" | sed 's/^/  /'
fi
echo
info "Full pack log: $PACK_LOG"
info "Full run log:  $SUMMARY_LOG"

# ---------------------------------------------------------------------------
# Summary & exit
# ---------------------------------------------------------------------------
hdr "Summary"
if [ $STATUS -eq 0 ]; then
  ok "All checks passed"
else
  fail "Some checks failed"
fi
exit $STATUS
