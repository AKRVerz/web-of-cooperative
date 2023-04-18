import * as middleware from '../src/middleware/pembukuans';
import { extractMiddleware, resolveMiddleware } from './utils/common';
import { createMockData, mockNextFn } from './utils/mock';

describe('Pembukuan Middleware', () => {
  it('Can validate user', async () => {
    const mw = extractMiddleware(middleware.createPembukuanMw);

    const { req, res } = createMockData({
      url: '/pembukuans',
      method: 'POST',
      body: {
        tanggal: new Date().toISOString(),
        uraian: 'Testing',
        sumWood: 500.6,
        harga: 2000,
        masuk: 50,
        keluar: 10,
        jumlah: 2000,
        afterCashBack: 200,
        sumCashBack: 100,
        cashBack: 1000,
      },
    });

    await resolveMiddleware({ req, res, mw });

    expect(req.pembukuan.id).toBeDefined();
  });
});
