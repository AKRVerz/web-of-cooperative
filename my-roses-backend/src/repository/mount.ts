import _ from "lodash";
import BaseRepository from "./baseRepository";
import {
  ModelStructure,
  ModelTypes,
  ModelScalarFields,
  MODELS_NAME,
  AnyRecord,
} from "./prisma-repo";

// This type will be used if you want to extends the functions in Pembukuan Class

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.MOUNT]["Where"];
type Select = ModelTypes[typeof MODELS_NAME.MOUNT]["Select"];
type Include = ModelTypes[typeof MODELS_NAME.MOUNT]["Include"];
type Create = ModelTypes[typeof MODELS_NAME.MOUNT]["Create"];
type Update = ModelTypes[typeof MODELS_NAME.MOUNT]["Update"];
type Cursor = ModelTypes[typeof MODELS_NAME.MOUNT]["Cursor"];
type Order = ModelTypes[typeof MODELS_NAME.MOUNT]["Order"];
type Delegate = ModelTypes[typeof MODELS_NAME.MOUNT]["Delegate"];
type Scalar = ModelScalarFields<typeof MODELS_NAME.MOUNT>;
type Model = ModelStructure[typeof MODELS_NAME.MOUNT];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class Mount extends BaseRepository(MODELS_NAME.MOUNT) {
  public static async resourceToModel(resource: AnyRecord) {
    const mount = _.pick(resource, [
      "userId",
      "debt",
      "user",
      "updatedAt",
      "createdAdt",
    ]);

    return mount as Create;
  }

  public static async modelToResource(mount: ModelStructure["mount"]) {
    return mount;
  }
}

export default Mount;
