module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/mockTestStyles.ts',
  },
}
