import { Prisma } from './instance';
import { hashText } from '../../src/utils/encryption';
import { USER_ROLE } from '../../src/utils/constant';
import moment from 'moment';

const main = async (prisma: Prisma) => {
  await prisma.user.createMany({
    data: [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: await hashText('admin'),
        role: USER_ROLE.ADMIN,
        noKtp: '100401',
        alamat: 'Jl Hi Rais',
        tanggal: moment('1997-07-16').toISOString() as unknown as Date,
      },
    ],
    skipDuplicates: true,
  });
};

export default main;
