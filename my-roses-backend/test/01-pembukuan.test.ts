import moment from 'moment';
import { Express } from 'express';
import supertest from 'supertest';
import * as middleware from '../src/middleware/pembukuans';
import * as userMiddleware from '../src/middleware/users';
import { USER_ROLE } from '../src/utils/constant';
import { hashText } from '../src/utils/encryption';
import { extractMiddleware, resolveMiddleware } from './utils/common';
import {
  createMockApi,
  createMockData,
  createPostRequest,
  mockLoginMw,
  mockNextFn,
} from './utils/mock';
import _ from 'lodash';

describe('Pembukuan Middleware', () => {
  let app: Express;

  beforeAll(async () => {
    app = await createMockApi();
  });

  it('get data', async () => {
    const id = 0;

    await supertest(app).get('/users').expect(true);
  });

  it('get user', async () => {
    const res = await createPostRequest(app).send({
      id: 0,
    });

    expect(res.statusCode).toBe(true);
  });

  // it.skip('get user', async () => {
  //   const mwUser = extractMiddleware(userMiddleware.getUsersMw);

  //   await createPostRequest(app).send({
  //     email: 'admin@admin.com',
  //   });
  // });

  // it.skip("Can't create a data without an admin authorization", async () => {
  //   const mw = extractMiddleware(middleware.createPembukuanMw);

  //   const { req, res } = createMockData({
  //     url: '/pembukuans',
  //     method: 'POST',
  //     body: {
  //       tanggal: new Date().toISOString(),
  //       uraian: 'Testing',
  //       sumWood: 500.6,
  //       harga: 2000,
  //       masuk: 50,
  //       keluar: 10,
  //       jumlah: 2000,
  //       afterCashBack: 200,
  //       sumCashBack: 100,
  //       cashBack: 1000,
  //     },
  //   });

  //   await mw(req, res, mockNextFn);

  //   expect(res.statusCode).toBe(401);
  // });

  // it('Can login with correct credentials', async () => {
  //   const { req, res } = createMockData({
  //     url: '/auth/login',
  //     method: 'POST',
  //     body: {
  //       email: 'admin@admin.com',
  //       password: await hashText('admin'),
  //       role: USER_ROLE.ADMIN,
  //       noKtp: '100401',
  //       alamat: 'Jl Hi Rais',
  //       tanggal: moment('1997-07-16').toISOString() as unknown as Date,
  //     },
  //   });

  //   req.isAdmin = true;

  // const mw = extractMiddleware(userMiddleware.loginMw);

  // await resolveMiddleware({ req, res, mw });

  // //   // await mw(req, res, mockNextFn);

  // const { data } = res._getJSONData();

  // expect(data.token).toBeTruthy();
  // });
});
