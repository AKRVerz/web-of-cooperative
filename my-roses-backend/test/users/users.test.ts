import moment from 'moment';
import { Express } from 'express';
import supertest from 'supertest';
import { USER_ROLE } from '../../src/utils/constant';
import { hashText } from '../../src/utils/encryption';
import { createMockApi, setMockApiHeader } from '../utils/mock';
import _ from 'lodash';

describe('User Middleware', () => {
  let app: Express;
  let token: string;
  let test: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    app = createMockApi();
    test = supertest(app);
  });

  it('Can login a user', async () => {
    const payload = {
      email: 'admin@admin.com',
      password: 'admin',
      role: USER_ROLE.ADMIN,
    };

    const request = await setMockApiHeader(
      test.post('/auth/login').send(payload)
    );

    token = request.body.token;

    expect(token).toBeTruthy();
  });

  it('Get users data', async () => {
    const request = setMockApiHeader(test.get('/users'));
    request.set('Authorization', `Bearer ${token}`);

    const response = (await request).body;

    expect(response.count).toBeDefined();
  });

  it('Get user', async () => {
    const request = setMockApiHeader(test.get('/users/1'));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it.skip('Create User', async () => {
    const payload = {
      username: 'admin2',
      email: 'admin2@admin.com',
      password: await hashText('admin'),
      role: USER_ROLE.ADMIN,
      noKtp: '10042001',
      alamat: 'Jl Hi Rais',
      tanggal: moment('2021-07-16').toISOString() as unknown as Date,
    };
    const request = setMockApiHeader(test.post('/users').send(payload));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it.skip('Update User', async () => {
    const payload = {
      username: 'admin@2001',
      email: 'admin2001@admin.com',
      password: await hashText('admin2'),
      role: USER_ROLE.ADMIN,
      noKtp: '20010410',
      alamat: 'Jl Hi Rais',
      tanggal: moment('2023-05-01').toISOString() as unknown as Date,
    };
    const request = setMockApiHeader(test.patch('/users/2').send(payload));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });
  it.skip('Delet User', async () => {
    const request = setMockApiHeader(test.delete('/users/2'));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(204);
  });
});
