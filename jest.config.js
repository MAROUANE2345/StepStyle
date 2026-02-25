/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        // Handle CSS/Images
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg|ico)$': '<rootDir>/__mocks__/fileMock.js',
        // Framework Mocks are handled by Jest's automatic mocking if in __mocks__ or manually in setup
    },
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
    },
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    collectCoverageFrom: [
        'components/**/*.{js,jsx}',
        'app/**/*.{js,jsx}',
        'lib/**/*.{js,jsx}',
        '!**/node_modules/**',
    ],
    transformIgnorePatterns: [
        '/node_modules/(?!(framer-motion)/)',
    ],
};

module.exports = config;
