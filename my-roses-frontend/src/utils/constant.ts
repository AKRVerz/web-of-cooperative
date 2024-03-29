export const USER_ROLE = {
  ADMIN: 'admin',
  MEMBER: 'member',
} as const;

export const RESOURCE_NAME = {
  USERS: 'users',
  PEMBUKUANS: 'pembukuans',
  IURANS: 'mounts',
} as const;

export const REPORT_CONTENT = {
  TGL: 'tanggal',
  DES: 'uraian',
  SMW: 'sumWood',
  MNY: 'harga',
  IN: 'masuk',
  OUT: 'keluar',
  SUM: 'jumlah',
};

export const ORDER = {
  DESC: 'desc',
  ASC: 'asc',
} as const;
