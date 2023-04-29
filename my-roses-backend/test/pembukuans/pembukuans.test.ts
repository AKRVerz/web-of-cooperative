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

    console.log(response);

    expect(response.count).toBeDefined();
  });

  it('Get one pembukuan', async () => {
    const request = setMockApiHeader(test.get('/pembukuans/1'));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it.skip('Create pembukuan', async () => {
    const request = setMockApiHeader(
      test.post('/pembukuans').send({
        tanggal: moment('2021-07-16').toISOString() as unknown as Date,
        uraian: 'Bibit Kopi',
        sumWood: 4500,
        harga: 25000,
        masuk: 112500000,
        keluar: 11806248,
        jumlah: 100693752,
        cashBack: 2000,
        sumCashBack: 9000000,
        afterCashBack: 103500000,
      })
    );
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it.skip('Update pembukuan', async () => {
    const request = setMockApiHeader(
      test.patch('/pembukuans/2').send({
        tanggal: moment('2021-08-01').toISOString() as unknown as Date,
        uraian: 'Bibit Jahe',
        sumWood: 4500,
        harga: 25000,
        masuk: 112500000,
        keluar: 11806248,
        jumlah: 100693752,
        cashBack: 2000,
        sumCashBack: 9000000,
        afterCashBack: 103500000,
      })
    );
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it.skip('Delete pembukuan', async () => {
    const request = setMockApiHeader(test.delete('/pembukuans/2'));
    request.set('Authorization', `Bearer ${token}`);

    const response = await request;

    expect(response.statusCode).toBe(204);
  });
});
