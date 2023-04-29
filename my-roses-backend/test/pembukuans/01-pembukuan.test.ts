import moment from 'moment';
import { Express } from 'express';
import supertest from 'supertest';
import * as middleware from '../../src/middleware/pembukuans';
import * as userMiddleware from '../../src/middleware/users';
import { USER_ROLE } from '../../src/utils/constant';
import { hashText } from '../../src/utils/encryption';
import { extractMiddleware, resolveMiddleware } from '../utils/common';
import { createMockApi, setMockApiHeader } from '../utils/mock';
import _ from 'lodash';

describe('Pembukuan Middleware', () => {
  let app: Express;
  let token: string;
  let test: supertest.SuperTest<supertest.Test>

  beforeAll(async () => {
    app = createMockApi();
    test = supertest(app);
  });

  it('Can login a user', async () => {
    const payload = {
      email: 'admin@admin.com',
      password: 'admin',
      role: USER_ROLE.ADMIN
    }
    
    const request = await setMockApiHeader(test.post('/auth/login').send(payload))

    token = request.body.token;

    expect(token).toBeTruthy()
  })

  it('Get users data', async () => {
    const request = setMockApiHeader(test.get('/users'));
    request.set('Authorization', `Bearer ${token}`)
    
    const response = (await request).body

    expect(response.count).toBeDefined()
  });

  it('Get user', async () => {
    const request = setMockApiHeader(test.get('/users/1'));
    request.set('Authorization', `Bearer ${token}`)
    
    const response = (await request)

    expect(response.statusCode).toBe(200)
    expect(response.body.role).toBeDefined()
  });
});
