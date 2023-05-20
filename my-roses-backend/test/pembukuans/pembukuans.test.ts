import moment from 'moment';
import { Express } from 'express';
import supertest from 'supertest';
import { USER_ROLE } from '../../src/utils/constant';
import { createMockApi, setMockApiHeader } from '../utils/mock';

describe('Pembukuan Middleware', () => {
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

  it('Get all pembukuan', async () => {
    const request = setMockApiHeader(test.get('/pembukuans'));
    request.set('Authorization', `Bearer ${token}`);

    const response = (await request).body;

    expect(response.count).toBeDefined();
  });

  it('Get one pembukuan', async () => {
    const request = setMockApiHeader(test.get('/pembukuans/1'));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it('Create pembukuan', async () => {
    const payload = {
      tanggal: moment('2021-07-16').toISOString() as unknown as Date,
      uraian: 'Jambi',
      sumWood: 4500,
      harga: 25000,
      masuk: 112500000,
      cashBack: 2000,
      sumCashBack: 9000000,
      payBreed: 67500000,
      shipCost: 2000000,
      roadMoney: 600000,
      operationalQc: 4500000,
      pph: 1687500,
      royalti: 4500000,
      keluar: 80787500,
      shu: 31712500,
    };
    const request = setMockApiHeader(test.post('/pembukuans').send(payload));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it('Update pembukuan', async () => {
    const payload = {
      tanggal: moment('2021-07-16').toISOString() as unknown as Date,
      uraian: 'Sumatera Selatan',
      sumWood: 4500,
      harga: 25000,
      masuk: 112500000,
      cashBack: 2000,
      sumCashBack: 9000000,
      roadBreed: 67500000,
      shipCost: 2500000,
      roadMoney: 600000,
      operationalQc: 4500000,
      pph: 1687500,
      royalti: 4500000,
      keluar: 81287500,
      shu: 31212500,
    };
    const request = setMockApiHeader(test.patch('/pembukuans/9').send(payload));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it('Delete pembukuan', async () => {
    const request = setMockApiHeader(test.delete('/pembukuans/9'));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(204);
  });
});
