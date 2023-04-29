const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  slowTestThreshold: 30,
  testMatch: ['**/test/**/*.test.ts?(x)'],
};

export default config;
