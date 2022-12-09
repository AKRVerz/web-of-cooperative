//! Do not edit this file manually, it is generate by `prisma repo generator`

import { PrismaClient, Prisma, User,
 File, } from '@prisma/client';
import _ from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;

export type BaseOption<Include, Select> = {
  include?: Include;
  select?: Select;
};

export type Find<Select, Include, Cursor, Order, Distinct> = BaseOption<Include, Select> & {
  cursor?: Cursor;
  take?: number;
  skip?: number;
  orderBy?: Prisma.Enumerable<Order>;
  distinct?: Distinct;
};

export type CountArgs<Select, Cursor, Order, Distinct> = Omit<
  Find<Select, never, Cursor, Order, Distinct>,
  'include'
>;

export type Aggregate<Cursor, Order, Distinct> = Omit<
  CountArgs<never, Cursor, Order, Distinct>,
  'select' | 'distinct'
>;

export const prisma = new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
});

export const models = _.omit(prisma, [
  '$on',
  '$connect',
  '$disconnect',
  '$use',
  '$executeRaw',
  '$executeRawUnsafe',
  '$queryRaw',
  '$queryRawUnsafe',
  '$transaction',
]);

export const MODELS_NAME = {
  USER: 'user',
  FILE: 'file',
} as const;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ModelStructure = {
  user: User;
  file: File;
};

export type ModelName = keyof ModelStructure;

export type ModelScalarFields<T extends keyof ModelStructure> = Prisma.Enumerable<
  keyof ModelStructure[T]
>;

export type ModelDelegate = Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined;

export type ModelTypes = {
  user: {
    Where: Prisma.UserWhereInput;
    Select: Prisma.UserSelect;
    Include: unknown;
    Create: Prisma.UserCreateInput | Prisma.UserUncheckedCreateInput;
    Update: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput;
    Cursor: Prisma.UserWhereUniqueInput;
    Order: Prisma.UserOrderByWithRelationInput;
    Delegate: Prisma.UserDelegate<ModelDelegate>;
    GroupBy: Prisma.UserGroupByOutputType;
  },
  file: {
    Where: Prisma.FileWhereInput;
    Select: Prisma.FileSelect;
    Include: unknown;
    Create: Prisma.FileCreateInput | Prisma.FileUncheckedCreateInput;
    Update: Prisma.FileUpdateInput | Prisma.FileUncheckedUpdateInput;
    Cursor: unknown;
    Order: Prisma.FileOrderByWithRelationInput;
    Delegate: Prisma.FileDelegate<ModelDelegate>;
    GroupBy: Prisma.FileGroupByOutputType;
  },
};
