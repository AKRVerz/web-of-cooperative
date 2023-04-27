import express, { Express } from 'express';
import supertest from 'supertest';

export const createMockApi = async () => {
  const app = express();

  return app;
};

export const createPostRequest = (app: Express, endpoint = '/auth') => {
  return supertest(app)
    .post(endpoint)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
};
