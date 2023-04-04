import _ from 'lodash';
import moment from 'moment';
import { AppDispatch } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';
import {
  addData,
  deleteData,
  getAllData,
  getDataById,
  updateData,
} from '../resources';

export const getAllIuran =
  (query = '', overwrite = true) =>
  () =>
    getAllData(RESOURCE_NAME.IURANS, query, overwrite)();

export const getIuranById =
  (id: number, query = '', overwrite = true) =>
  () =>
    getDataById(RESOURCE_NAME.IURANS, id, query, overwrite)();

export const createIuran =
  (payload: Koperasi.Resource.Create['mount']) => (dispatch: AppDispatch) => {
    if (typeof payload.debt === 'string') {
      payload.debt = +payload.debt;
    }

    return addData('iurans' as unknown as Resource.ResourceName)({
      ...payload,
      createdAt: moment(payload.createdAt).toISOString() as unknown as Date,
    })(dispatch) as unknown as Promise<Resource.ResourceStructure['mount']>;
  };

export const updateIuran =
  (id: number, update: Koperasi.Resource.Update['mount'], query = '') =>
  () =>
    updateData(RESOURCE_NAME.IURANS)(id, {
      ...update,
      ...(!_.isEmpty(update.updatedAt) && {
        updateAt: moment(update.updateAt).toISOString() as unknown as Date,
      }),
    });

export const deleteIuran =
  (id: number, noRequest = false) =>
  (dispatch: AppDispatch) =>
    deleteData(RESOURCE_NAME.IURANS, id, noRequest)(dispatch);
