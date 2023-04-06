import { ModelStructure } from '../../../my-roses-backend/src/repository/prisma-repo';
import { RESOURCE_NAME, USER_ROLE } from 'src/utils/constant';

type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
type ResourceName = typeof RESOURCE_NAME[keyof typeof RESOURCE_NAME];

export type ResourceStructure = {
  [RESOURCE_NAME.USERS]: ModelStructure['user'] & {
    iurans?: ModelStructure['mounts'][];
  };
  [RESOURCE_NAME.PEMBUKUANS]: ModelStructure['pembukuan'];
  [RESOURCE_NAME.IURANS]: ModelStructure['mounts'];
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
  [RESOURCE_NAME.IURANS]: ResourceRecord<'mounts'>;
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
    ModelStructure['mounts'],
    'id' | 'updatedAt' | 'userId'
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
  [RESOURCE_NAME.IURANS]: Paerial<
    Omit<
      Koperasi.Resource.ResourceStructure[typeof RESOURCE_NAME.IURANS],
      'id' | 'createdAt' | 'userId'
    >
  >;
};

export type UpdatePassword = {
  password: string;
  confirmationPassword: string;
  oldPassword: string;
};

export type ReactSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export as namespace Resource;
