export default {
	transform: {
		'^.+\\.tsx?$': 'babel-jest'
	},
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.ts'],
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	collectCoverage: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.ts'],
};
