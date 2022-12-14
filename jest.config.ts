import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '.*\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
}
export default config
