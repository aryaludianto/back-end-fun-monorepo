/* eslint-disable */
const baseConfig = require('../../jest.config.base.ts');

export default {
  ...baseConfig,
  displayName: 'word-counter',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/word-counter',
};
