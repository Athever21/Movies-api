const defaultConfig = require('./jest.config');

module.exports = {
  ...defaultConfig,
  roots: ["<rootDir>/test"],
  testRegex: ['.e2e-spec.ts$']
};
