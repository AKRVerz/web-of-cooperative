import { config as dotenvConfig } from 'dotenv';
import httpMocks from 'node-mocks-http';
import * as userMiddleware from '../../src/middleware/users';
import { extractMiddleware, resolveMiddleware } from './common';
import express, { Express } from 'express';
import supertest from 'supertest';
import root from '../../src/utils/root';

dotenvConfig();

export const createMockApi = async () => {
  const app = express();

  root(app);

  return app;
};

export const createPostRequest = (app: Express, endpoint = '/user') => {
  return supertest(app)
    .get(endpoint)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
};

export const createMockData = ({
  url,
  method,
  body = {},
  query = {},
}: {
  method: httpMocks.RequestMethod;
  url: string;
  body?: httpMocks.Body;
  query?: httpMocks.Query;
}) => {
  const { req, res } = httpMocks.createMocks({
    url,
    method,
    query,
    body,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });

  return { req, res };
};

export const mockNextFn = () => {
  return null;
};

export const mockLoginMw = async () => {
  const { req, res } = createMockData({
    url: '/auth/login',
    method: 'POST',
    body: {
      email: 'admin@admin.com',
      password: 'admin',
    },
  });

  const mw = extractMiddleware(userMiddleware.loginMw);

  await mw(req, res, mockNextFn);

  return { req, res };
};
