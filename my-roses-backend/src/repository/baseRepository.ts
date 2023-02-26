/* eslint-disable @typescript-eslint/ban-ts-comment */
// Keep in mind that this file is automatically generated.
// You can change the content of this file, but it will be overwritten.

import { Prisma } from '@prisma/client';
import _ from 'lodash';
import {
  Aggregate,
  AnyRecord,
  BaseOption,
  CountArgs,
  Find,
  ModelName,
  models,
  ModelScalarFields,
  ModelStructure,
  ModelTypes,
} from './prisma-repo';

export const extractCondition = <Cursor, Where>(
  conditions: Cursor | Where | number | string
) => {
  const dbCond = _.isObject(conditions)
    ? conditions
    : { id: _.toNumber(conditions) };

  return dbCond;
};

/**
 * @param modelName - The model name
 */

const BaseRepository = <
  T extends ModelName,
  Where extends ModelTypes[T]['Where'],
  Select extends ModelTypes[T]['Select'],
  Include extends ModelTypes[T]['Include'],
  Create extends ModelTypes[T]['Create'],
  Update extends ModelTypes[T]['Update'],
  Cursor extends ModelTypes[T]['Cursor'],
  Order extends ModelTypes[T]['Order'],
  Delegate extends ModelTypes[T]['Delegate'],
  Scalar extends ModelScalarFields<T>,
  Model extends ModelStructure[T]
>(
  modelName: T
) => {
  abstract class AbstractBaseRepository {
    protected static modelName: T = modelName;

    /**
     * Find zero or more `model` that matches the filter.\
     * Note, that providing `undefined` is treated as the value not being there.
     */

    public static async findAll(
      conditions: Where | number | string,
      filterQueryParams: AnyRecord = {},
      query: AnyRecord = {},
      option: Find<Select, Include, Cursor, Order, Scalar> = {}
    ) {
      const limit = +(query.limit === 'all' ? 0 : _.get(query, 'limit', 10));
      const offset =
        query.page && query.page > 0 ? limit * (query.page - 1) : 0;
      const otherOptions = _.omit(query, ['limit', 'offset', 'page']);

      const where = {
        ...extractCondition(conditions),
        ...filterQueryParams,
        ...otherOptions,
      };

      return {
        // @ts-ignore
        rows: (await AbstractBaseRepository.model.findMany({
          // @ts-ignore
          where,
          ...option,
          skip: offset,
          ...(limit > 0 && { take: limit }),
        })) as Model[],
        /* @ts-ignore */
        count: await this.count(where),
      };
    }

    /**
     * Alternative of `findAll`.\
     * It works same as `findOne` but only have different names.\
     * It exists for anyone who prefer to use prisma `functions` original name.
     */

    public static async findMany(...params: Parameters<typeof this.findAll>) {
      return AbstractBaseRepository.findAll(...params);
    }

    /**
     * Find the first `model` that matches the filter.\
     * Note, that providing `undefined` is treated as the value not being there.
     */

    public static async findOne(
      conditions: Where | number | string,
      option: Find<Select, Include, Cursor, Order, Scalar> = {}
    ) {
      const where = extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.findFirst({
        // @ts-ignore
        where,
        ...option,
      }) as Promise<Model | null>;
    }

    /**
     * Alternative of `findOne`.\
     * It works same as `findOne` but only have different names.\
     * It exists for anyone who prefer to use prisma `functions` original name.
     */
    public static async findFirst(...params: Parameters<typeof this.findOne>) {
      return AbstractBaseRepository.findOne(...params);
    }

    /**
     * Find zero or one `model` that matches the filter.\
     * Note, that providing `undefined` is treated as the value not being there.\
     * It works same as `findOne` or `findFirst` but only accept a unique column.
     */

    public static async findUnique(
      conditions: Cursor | number | string,
      option: BaseOption<Include, Select> = {}
    ) {
      const where = extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.findUnique({
        // @ts-ignore
        where,
        ...option,
      }) as Promise<Model | null>;
    }

    /**
     * Create a `model`.
     */

    public static async create(
      data: Create,
      option: BaseOption<Include, Select> = {}
    ) {
      // @ts-ignore
      return AbstractBaseRepository.model.create({
        data,
        ...option,
      }) as Promise<Model>;
    }

    /**
     * Update a `model`.
     */

    public static async update(
      conditions: Where | number | string,
      data: Update | Create,
      option: BaseOption<Include, Select> = {}
    ) {
      const where = extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.update({
        data,
        // @ts-ignore
        where,
        ...option,
      }) as Promise<Model>;
    }

    /**
     * Delete any `model` that match with the conditions.
     */

    public static async delete(conditions: Where | number | string) {
      const where = extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.deleteMany({
        // @ts-ignore
        where,
      }) as Promise<Prisma.BatchPayload>;
    }

    /**
     * Delete a `model`.
     */

    public static async deleteOne(conditions: Where | number | string) {
      const where = extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.delete({
        // @ts-ignore
        where,
      }) as Promise<Model>;
    }

    /**
     * Create or update one `model`.
     */

    public static async updateOrCreate(
      conditions: Where | number | string,
      data: Create,
      option: Find<Select, Include, Cursor, Order, Scalar> = {}
    ) {
      const obj = await AbstractBaseRepository.findOne(conditions, option);

      if (obj) return AbstractBaseRepository.update(conditions, data, option);

      return AbstractBaseRepository.create(data);
    }

    /**
     * Alternative of `updateOrCreate`.\
     * It works same as `updateOrCreate` but only have different names.\
     * It exists for anyone who prefer to use prisma `functions` original name.
     */
    public static async upsert(
      ...params: Parameters<typeof this.updateOrCreate>
    ) {
      return AbstractBaseRepository.updateOrCreate(...params);
    }

    /**
     * Create many `model`.
     */
    public static async bulkCreate(
      data: Prisma.Enumerable<Create>,
      skipDuplicates = true
    ) {
      // @ts-ignore
      return AbstractBaseRepository.model.createMany({
        data,
        // @ts-ignore
        skipDuplicates,
      }) as Promise<Prisma.BatchPayload>;
    }

    /**
     * Alternative of `bulkCreate`.\
     * It works same as `bulkCreate` but only have different names.\
     * It exists for anyone who prefer to use prisma `functions` original name.
     */
    public static async createMany(
      ...params: Parameters<typeof this.bulkCreate>
    ) {
      return AbstractBaseRepository.bulkCreate(...params);
    }

    /**
     * Update zero or more `model`.
     * Note, that providing `undefined` is treated as the value not being there.
     */

    public static async bulkUpdate(
      where: Where,
      data: Prisma.Enumerable<Update>
    ) {
      // @ts-ignore
      return AbstractBaseRepository.model.updateMany({
        data,
        where,
      }) as Promise<Prisma.BatchPayload>;
    }

    /**
     * Alternative of `bulkUpdate`.\
     * It works same as `bulkUpdate` but only have different names.\
     * It exists for anyone who prefer to use prisma `functions` original name.
     */
    public static async updateMany(
      ...params: Parameters<typeof this.bulkUpdate>
    ) {
      return AbstractBaseRepository.bulkUpdate(...params);
    }

    /**
     * Count the number of `model`.\
     * Note, that providing `undefined` is treated as the value not being there.
     */

    public static async count(
      conditions: Where | number | string,
      option: CountArgs<Select, Cursor, Order, Scalar> = {}
    ) {
      const where = extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.count({
        // @ts-ignore
        where,
        ...option,
      }) as Promise<number>;
    }

    public static async groupBy(
      conditions: Where | number | string,
      aggregator: Omit<
        // @ts-ignore
        Parameters<typeof this.model.aggregate>[0],
        'where' | 'cursor'
      > & {
        groupBy: Scalar[];
      }
    ) {
      const where = extractCondition(conditions);

      // @ts-ignore
      return AbstractBaseRepository.model.groupBy({
        // @ts-ignore
        where,
        ...aggregator,
      });
    }

    /**
     * Allows you to perform aggregations operations on a `model`.\
     * Note, that providing `undefined` is treated as the value not being there.\
     * If no any kind of aggregator provided, will use `count` by default.
     */

    public static aggregate(
      conditions: Where | number | string,
      aggregator: Omit<
        // @ts-ignore
        Parameters<typeof this.model.aggregate>[0],
        'cursor' | 'take' | 'skip' | 'orderBy' | 'where'
      >,
      option: Aggregate<Cursor, Order, Scalar> = {}
    ) {
      // @ts-ignore
      const aggregate = AbstractBaseRepository.model
        .aggregate as Delegate['aggregate'];
      const where = extractCondition(conditions);

      if (_.isEmpty(aggregator)) {
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        aggregator._count = true;
      }

      // @ts-ignore
      return aggregate({
        // @ts-ignore
        where,
        ...aggregator,
        ...option,
      }) as ReturnType<typeof aggregate>;
    }

    public static get model(): Delegate {
      // @ts-ignore
      return models[AbstractBaseRepository.modelName];
    }
  }

  return AbstractBaseRepository;
};

export default BaseRepository;
