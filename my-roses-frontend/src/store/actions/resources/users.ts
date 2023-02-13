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

export const getAllUser =
  (query = '', overwrite = true) =>
  () =>
    getAllData(RESOURCE_NAME.USERS, query, overwrite)();

export const getUserById =
  (id: number, query = '', overwrite = true) =>
  () =>
    getDataById(RESOURCE_NAME.USERS, id, query, overwrite)();

export const createUser =
  (payload: Koperasi.Resource.Create['users']) => (dispatch: AppDispatch) => {
    return addData(RESOURCE_NAME.USERS)({
      ...payload,
      tanggal: moment(payload.tanggal).toISOString() as unknown as Date,
    })(dispatch);
  };

export const updateUser =
  (id: number, update: Koperasi.Resource.Update['users'], query = '') =>
  () =>
    updateData(RESOURCE_NAME.USERS)(
      id,
      {
        ...update,
        ...(!_.isEmpty(update.tanggal) && {
          tanggal: moment(update.tanggal).toISOString() as unknown as Date,
        }),
      },
      query
    )();

export const deleteUser =
  (id: number, noRequest = false) =>
  (dispatch: AppDispatch) =>
    deleteData(RESOURCE_NAME.USERS, id, noRequest)(dispatch);
