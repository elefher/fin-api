module.exports = {
  moduleNameMapper: {
    '^@authentication(.*)$': '<rootDir>/src/authentication$1',
    '^@db(.*)$': '<rootDir>/src/db$1',
    '^@routes(.*)$': '<rootDir>/src/routes$1',
    '^@http(.*)$': '<rootDir>/src/http$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@middlewares(.*)$': '<rootDir>/src/middlewares$1',
  },
  testEnvironment: 'node',
}
