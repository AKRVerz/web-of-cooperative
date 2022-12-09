import { AppDispatch } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';
import {
  addData,
  deleteData,
  getAllData,
  getDataById,
  updateData,
} from '../resources';

export const getAlluser =
  (query = '', overwrite = true) =>
  () =>
    getAllData(RESOURCE_NAME.USERS, query, overwrite)();

getAlluser('filters=role="member"');

export const getUserById =
  (id: number, query = '', overwrite = true) =>
  () =>
    getDataById(RESOURCE_NAME.USERS, id, query, overwrite)();

export const createUser =
  (
    payload: Omit<
      Koperasi.Resource.ResourceStructure[typeof RESOURCE_NAME.USERS],
      'id' | 'createdAt' | 'updatedAt'
    >
  ) =>
  (dispatch: AppDispatch) =>
    addData(RESOURCE_NAME.USERS)(payload)(dispatch);

export const updateUser =
  (
    id: number,
    update: Partial<
      Omit<
        Koperasi.Resource.ResourceStructure[typeof RESOURCE_NAME.USERS],
        'id' | 'createdAt' | 'updatedAt' | 'password'
      >
    >,
    query = ''
  ) =>
  () =>
    updateData(RESOURCE_NAME.USERS)(id, update, query)();

export const deleteuser =
  (id: number, noRequest = false) =>
  (dispatch: AppDispatch) =>
    deleteData(RESOURCE_NAME.USERS, id, noRequest)(dispatch);
