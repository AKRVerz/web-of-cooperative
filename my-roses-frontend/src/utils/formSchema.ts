import _ from 'lodash';
import * as Yup from 'yup';
import { USER_ROLE } from './constant';

const isValidNumber = (value: number | undefined, greaterThan = 0) => {
  if (
    typeof value === 'undefined' ||
    typeof +value !== 'number' ||
    Number.isNaN(+value)
  )
    return false;

  return +value > greaterThan;
};

export const passwordSchema = Yup.object({
  password: Yup.string().required('Password dibutuhkan'),
});

export const loginSchema = Yup.object({
  userName: Yup.string().required('Nama Lengkap Dibutuhkan'),
  role: Yup.mixed()
    .required('Role Dibutuhkan')
    .test('role', 'Role Tidak Valid', (role) => _.includes(USER_ROLE, role)),
}).concat(passwordSchema);

export const userSchema = Yup.object({
  email: Yup.string().email().required('Email Dibutuhkan'),
  username: Yup.string().required('Nama Lengkap Dibutuhkan'),
  noKtp: Yup.string().required('No KTP Dibutuhkan'),
  alamat: Yup.string().required('Alamat Dibutuhkan'),
  tanggal: Yup.date().required('Tanggal Dibutuhkan'),
  role: Yup.mixed()
    .required('Role Dibutuhkan')
    .test('role', 'Role Tidak Valid', (role) => _.includes(USER_ROLE, role)),
}).concat(passwordSchema);

export const pembukuanSchema = Yup.object({
  tanggal: Yup.date().required('Tanggal Dibutuhkan'),
  uraian: Yup.string().required('Uraian Dibutuhkan'),
  sumWood: Yup.number()
    .test('isSumWoodValid', 'Batang/Kg harus besar dari 0', (value) =>
      isValidNumber(value, 0)
    )
    .required('Jumlah Batang/Kg Dibutuhkan'),
  harga: Yup.number()
    .test('isSumWoodValid', 'Harga harus besar dari 0', (value) =>
      isValidNumber(value, 0)
    )

    .required('Harga Dibutuhkan'),
  keluar: Yup.number()
    .test('isSumWoodValid', 'Keluar harus besar dari 0', (value) =>
      isValidNumber(value, 0)
    )

    .required('Keluar Dibutuhkan'),
});

export const adminSchema = Yup.object({
  password: Yup.string(),
}).concat(userSchema.omit(['password']));

export const createAdminSchema = adminSchema.concat(passwordSchema);

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required('Password lama dibutuhkan'),
  password: Yup.string().required('Password dibutuhkan'),
  confirmationPassword: Yup.string()
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().required('Konfirmasi password dibutuhkan'),
    })
    .oneOf([Yup.ref('password'), null], 'Konfirmasi dan Password tidak sama'),
});
