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

export const getAllPembukuan =
  (query = '', overwrite = true) =>
  () =>
    getAllData(RESOURCE_NAME.PEMBUKUANS, query, overwrite)();

export const getPembukuanById =
  (id: number, query = '', overwrite = true) =>
  () =>
    getDataById(RESOURCE_NAME.PEMBUKUANS, id, query, overwrite)();

export const createPembukuan =
  (payload: Koperasi.Resource.Create['pembukuans']) =>
  (dispatch: AppDispatch) => {
    payload.masuk = payload.harga * payload.sumWood;
    payload.pph = payload.harga * payload.sumWood * (1.5 / 100);
    payload.sumCashBack = payload.cashBack * payload.sumWood;
    payload.operationalQc = payload.sumWood * 1000;
    payload.royalti = payload.sumWood * 1000;
    payload.payBreed = payload.payBreed * payload.sumWood;
    payload.keluar =
      payload.payBreed +
      payload.shipCost +
      payload.roadMoney +
      payload.harga * payload.sumWood * (1.5 / 100) +
      payload.sumWood * 1000 +
      payload.sumWood * 1000;
    payload.shu =
      payload.harga * payload.sumWood -
      payload.payBreed -
      payload.shipCost -
      payload.roadMoney -
      payload.harga * payload.sumWood * (1.5 / 100) -
      payload.sumWood * 1000 -
      payload.sumWood * 1000;

    return addData(RESOURCE_NAME.PEMBUKUANS)({
      ...payload,
      tanggal: moment(payload.tanggal).toISOString() as unknown as Date,
    })(dispatch);
  };

export const updatePembukuan =
  (id: number, update: Koperasi.Resource.Update['pembukuans'], query = '') =>
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

export const DEFAULT_DOCUMENT_PROPS = {
  author: 'Koperasi Argo Mulyo Lestari',
  creator: 'Koperasi Argo Mulyo Lestari',
  producer: 'Desa Girimulyo',
  subject: 'Laporan Pembukuan',
};
