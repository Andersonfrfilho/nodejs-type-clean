export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  testEnvironment: 'node'
}
