import { config as dotenvConfig } from 'dotenv';
import httpMocks from 'node-mocks-http';
import * as userMiddleware from '../../src/middleware/users';
import { extractMiddleware, resolveMiddleware } from './common';
import express, { Express } from 'express';
import supertest from 'supertest';
import root from '../../src/utils/root';

dotenvConfig();

export const createMockApi = () => {
  const app = express();

  root(app);

  return app;
};

export const setMockApiHeader = (mock: supertest.Request) =>
  mock
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
