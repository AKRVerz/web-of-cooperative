import moment from 'moment';
import { Express } from 'express';
import supertest from 'supertest';
import { USER_ROLE } from '../../src/utils/constant';
import { createMockApi, setMockApiHeader } from '../utils/mock';

describe('Iuran Middleware', () => {
  let app: Express;
  let token: string;
  let test: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    app = createMockApi();
    test = supertest(app);
  });

  it('Can login as admin', async () => {
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

  it('Get all iuran', async () => {
    const request = setMockApiHeader(test.get('/mounts'));
    request.set('Authorization', `Bearer ${token}`);

    const response = (await request).body;
    console.log(response);
    expect(response.count).toBeDefined();
  });

  it.skip('Create Iurans', async () => {
    const request = setMockApiHeader(
      test.post('/mounts').send({
        userId: 4,
        debt: 2020202,
        createdAt: moment('2021-07-16').toISOString() as unknown as Date,
      })
    );
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });
  it.skip('Update Iurans', async () => {
    const request = setMockApiHeader(
      test.patch('/mounts/4').send({
        userId: 4,
        debt: 111111,
        createdAt: moment('2021-05-16').toISOString() as unknown as Date,
      })
    );
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });
  it('Delete Iurans', async () => {
    const request = setMockApiHeader(test.delete('/mounts/2'));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;
    console.log(response);
    expect(response.statusCode).toBe(204);
  });
});
