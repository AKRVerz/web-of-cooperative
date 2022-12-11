import { AppDispatch } from "src/store";
import { RESOURCE_NAME, USER_ROLE } from "src/utils/constant";
import {
  addData,
  deleteData,
  getAllData,
  getDataById,
  updateData,
} from "../resources";

export const getAlluser =
  (query = "", overwrite = true) =>
  () =>
    getAllData(RESOURCE_NAME.USERS, query, overwrite)();

export const getUserById =
  (id: number, query = "", overwrite = true) =>
  () =>
    getDataById(RESOURCE_NAME.USERS, id, query, overwrite)();

export const createUser =
  (payload: Koperasi.Resource.Create["users"]) => (dispatch: AppDispatch) =>
    addData(RESOURCE_NAME.USERS)(payload)(dispatch);

export const updateUser =
  (id: number, update: Koperasi.Resource.Update["users"], query = "") =>
  () =>
    updateData(RESOURCE_NAME.USERS)(id, update, query)();

export const deleteUser =
  (id: number, noRequest = false) =>
  (dispatch: AppDispatch) =>
    deleteData(RESOURCE_NAME.USERS, id, noRequest)(dispatch);
