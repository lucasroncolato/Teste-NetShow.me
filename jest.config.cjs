module.exports = {
    transform: {
      '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy'
    },
    testEnvironment: 'jest-environment-jsdom',
  };