import _ from 'lodash';
import BaseRepository from './baseRepository';
import {
  ModelStructure,
  ModelTypes,
  ModelScalarFields,
  MODELS_NAME,
  AnyRecord,
} from './prisma-repo';

// This type will be used if you want to extends the functions in Pembukuan Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.PEMBUKUAN]['Where'];
type Select = ModelTypes[typeof MODELS_NAME.PEMBUKUAN]['Select'];
type Include = ModelTypes[typeof MODELS_NAME.PEMBUKUAN]['Include'];
type Create = ModelTypes[typeof MODELS_NAME.PEMBUKUAN]['Create'];
type Update = ModelTypes[typeof MODELS_NAME.PEMBUKUAN]['Update'];
type Cursor = ModelTypes[typeof MODELS_NAME.PEMBUKUAN]['Cursor'];
type Order = ModelTypes[typeof MODELS_NAME.PEMBUKUAN]['Order'];
type Delegate = ModelTypes[typeof MODELS_NAME.PEMBUKUAN]['Delegate'];
type Scalar = ModelScalarFields<typeof MODELS_NAME.PEMBUKUAN>;
type Model = ModelStructure[typeof MODELS_NAME.PEMBUKUAN];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class Pembukuan extends BaseRepository(MODELS_NAME.PEMBUKUAN) {
  public static async resourceToModel(resource: AnyRecord) {
    const pembukuan = _.pick(resource, [
      'hari',
      'tanggal',
      'uraian',
      'sumWood',
      'harga',
      'masuk',
      'keluar',
      'jumlah',
      'afterCashBack',
      'sumCashBack',
      'cashBack',
    ]);

    return pembukuan as Create;
  }

  public static async modelToResource(pembukuan: ModelStructure['pembukuan']) {
    return pembukuan;
  }
}

export default Pembukuan;
