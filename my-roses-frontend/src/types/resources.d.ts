import { ModelStructure } from '../../../my-roses-backend/src/repository/prisma-repo';
import { RESOURCE_NAME, USER_ROLE } from 'src/utils/constant';

type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
type ResourceName = typeof RESOURCE_NAME[keyof typeof RESOURCE_NAME];

export type ResourceStructure = {
  [RESOURCE_NAME.USERS]: ModelStructure['user'];
};

export type ResourceRecord<T extends ResourceName> = {
  rows: {
    [id: number]: Resource[T];
  };
  count: number;
};

export type Resources = {
  [RESOURCE_NAME.USERS]: ResourceRecord<typeof RESOURCE_NAME.USERS>;
};

export type Create = {
  [RESOURCE_NAME.USERS]: Omit<
    ModelStructure['user'],
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
};

export as namespace Resource;
