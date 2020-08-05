module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tests/tsconfig.json',
      diagnostics: false
    }
  },
  roots: ['<rootDir>'],
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  transformIgnorePatterns: ['node_modules', '__snapshots__'],
  testMatch: [
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
    '**/__tests__/**/(*.)+(spec|test).+(ts|tsx|js)'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/__snapshots__/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  }
};
