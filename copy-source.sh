#!/bin/bash

# Exit on error
set -e

SRC_DIR="./src"
DEST_DIR="./tests"

echo "🔁 Copying .ts files from $SRC_DIR to $DEST_DIR (excluding test files)..."

# Find all .ts files excluding *.test.ts
find "$SRC_DIR" -type f -name "*.ts" ! -name "*.test.ts" | while read -r src_file; do
  # Determine relative path
  rel_path="${src_file#$SRC_DIR/}"

  # Destination path
  dest_path="$DEST_DIR/$rel_path"

  # Ensure destination directory exists
  mkdir -p "$(dirname "$dest_path")"

  # Copy the file
  cp "$src_file" "$dest_path"

  echo "✅ Copied: $rel_path"
done

echo "🏁 Copy complete."
