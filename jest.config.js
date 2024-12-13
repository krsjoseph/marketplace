const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './src/',
})

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}

module.exports = createJestConfig(config)