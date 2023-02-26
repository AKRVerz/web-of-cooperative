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

export const deleteIuran =
  (id: number, noRequest = false) =>
  (dispatch: AppDispatch) =>
    deleteData(RESOURCE_NAME.IURANS, id, noRequest)(dispatch);
