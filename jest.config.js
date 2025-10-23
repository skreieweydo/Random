// jest.config.js (ESM)
export default {
  transform: { '^.+\\.tsx?$': 'babel-jest' },
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],           // only spec files
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'cjs'],

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',                      // reliable for TS+ESM
  collectCoverageFrom: [
    'tests/index.ts',             // your “source” shim
    'tests/utils/index.ts',       // your “source” shim
    '!tests/**/*.test.ts',        // never instrument spec files
  ],

  // Optional: guard against accidentally counting helpers or d.ts
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '\\.d\\.ts$',
  ],

  // Optional: make the report obvious
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
};
