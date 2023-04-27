const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  slowTestThreshold: 30,
  testMatch: ['**/test/*.ts?(x)'],
};

export default config;
