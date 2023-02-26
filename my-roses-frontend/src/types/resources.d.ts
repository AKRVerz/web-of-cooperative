import { ModelStructure } from '../../../my-roses-backend/src/repository/prisma-repo';
import { RESOURCE_NAME, USER_ROLE } from 'src/utils/constant';

type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
type ResourceName = typeof RESOURCE_NAME[keyof typeof RESOURCE_NAME];

export type ResourceStructure = {
  [RESOURCE_NAME.USERS]: ModelStructure['user'] & {
    iurans?: ModelStructure['mount'][];
  };
  [RESOURCE_NAME.PEMBUKUANS]: ModelStructure['pembukuan'];
  [RESOURCE_NAME.IURANS]: ModelStructure['mount'];
};

export type ResourceRecord<T extends ResourceName> = {
  rows: {
    [id: number]: ResourceStructure[T];
  };
  count: number;
};

export type Resources = {
  [RESOURCE_NAME.USERS]: ResourceRecord<typeof RESOURCE_NAME.USERS>;
  [RESOURCE_NAME.PEMBUKUANS]: ResourceRecord<typeof RESOURCE_NAME.PEMBUKUANS>;
  [RESOURCE_NAME.IURANS]: ResourceRecord<'mount'>;
};

export type Create = {
  [RESOURCE_NAME.USERS]: Omit<
    ModelStructure['user'],
    'id' | 'createdAt' | 'updatedAt'
  >;
  [RESOURCE_NAME.PEMBUKUANS]: Omit<
    ModelStructure['pembukuan'],
    'id' | 'createdAt' | 'updatedAt'
  >;
  [RESOURCE_NAME.IURANS]: Omit<
    ModelStructure['mount'],
    'id' | 'createdAt' | 'updatedAt'
  >;
};

export type Update = {
  [RESOURCE_NAME.USERS]: Partial<
    Omit<
      Koperasi.Resource.ResourceStructure[typeof RESOURCE_NAME.USERS],
      'id' | 'createdAt' | 'updatedAt' | 'password'
    >
  >;
  [RESOURCE_NAME.PEMBUKUANS]: Partial<
    Omit<
      Koperasi.Resource.ResourceStructure[typeof RESOURCE_NAME.PEMBUKUANS],
      'id' | 'createdAt' | 'updatedAt'
    >
  >;
  [RESOURCE_NAME.IURANS]: Partial<
    Omit<
      Koperasi.Resource.ResourceStructure['mount'],
      'id' | 'createdAt' | 'updatedAt'
    >
  >;
};

export type UpdatePassword = {
  password: string;
  confirmationPassword: string;
  oldPassword: string;
};

export as namespace Resource;
