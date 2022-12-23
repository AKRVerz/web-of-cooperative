import _ from "lodash";
import moment from "moment";
import { AppDispatch } from "src/store";
import { RESOURCE_NAME } from "src/utils/constant";
import {
  addData,
  deleteData,
  getAllData,
  getDataById,
  updateData,
} from "../resources";

export const getAllPembukuan =
  (query = "", overwrite = true) =>
  () =>
    getAllData(RESOURCE_NAME.PEMBUKUANS, query, overwrite)();

export const getPembukuanById =
  (id: number, query = "", overwrite = true) =>
  () =>
    getDataById(RESOURCE_NAME.PEMBUKUANS, id, query, overwrite)();

export const createPembukuan =
  (payload: Koperasi.Resource.Create["pembukuans"]) =>
  (dispatch: AppDispatch) => {
    return addData(RESOURCE_NAME.PEMBUKUANS)({
      ...payload,
      tanggal: moment(payload.tanggal).toISOString() as unknown as Date,
    })(dispatch);
  };

export const updatePembukuan =
  (id: number, update: Koperasi.Resource.Update["pembukuans"], query = "") =>
  () =>
    updateData(RESOURCE_NAME.PEMBUKUANS)(
      id,
      {
        ...update,
        ...(!_.isEmpty(update.tanggal) && {
          tanggal: moment(update.tanggal).toISOString() as unknown as Date,
        }),
      },
      query
    )();

export const deletePembukuan =
  (id: number, noRequest = false) =>
  (dispatch: AppDispatch) =>
    deleteData(RESOURCE_NAME.PEMBUKUANS, id, noRequest)(dispatch);
