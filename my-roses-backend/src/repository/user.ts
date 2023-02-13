import _ from "lodash";
import { Prisma } from "@prisma/client";
import { hashText } from "../utils/encryption";
import BaseRepository from "./baseRepository";
import {
  AnyRecord,
  Find,
  ModelScalarFields,
  ModelStructure,
  MODELS_NAME,
  ModelTypes,
} from "./prisma-repo";

/* eslint-disable @typescript-eslint/no-unused-vars */
type Where = ModelTypes[typeof MODELS_NAME.USER]["Where"];
type Select = ModelTypes[typeof MODELS_NAME.USER]["Select"];
type Include = ModelTypes[typeof MODELS_NAME.USER]["Include"];
type Create = ModelTypes[typeof MODELS_NAME.USER]["Create"];
type Update = ModelTypes[typeof MODELS_NAME.USER]["Update"];
type Cursor = ModelTypes[typeof MODELS_NAME.USER]["Cursor"];
type Order = ModelTypes[typeof MODELS_NAME.USER]["Order"];
type Delegate = ModelTypes[typeof MODELS_NAME.USER]["Delegate"];
type Scalar = ModelScalarFields<typeof MODELS_NAME.USER>;
type Model = ModelStructure[typeof MODELS_NAME.USER];
/*  eslint-enable @typescript-eslint/no-unused-vars */

class User extends BaseRepository(MODELS_NAME.USER) {
  public static async resourceToModel(resource: AnyRecord) {
    const user = _.pick(resource, [
      "email",
      "username",
      "password",
      "role",
      "noKtp",
      "alamat",
      "tanggal",
      "iurans",
    ]);

    if (user.email) user.email = _.toLower(resource.email);
    if (user.password) user.password = await hashText(resource.password);

    return user as Prisma.UserCreateInput;
  }

  public static async modelToResource(user: ModelStructure["user"]) {
    return _.omit(user, ["password", "updatedAt"]);
  }

  public static async checkEmailUsername(
    email: string,
    username: string,
    id: string | number | null = null
  ) {
    if (!_.isEmpty(email)) {
      const checkEmail = await this.findOne({
        email: _.toLower(email),
      });

      if (checkEmail && (!_.isNil(id) ? checkEmail.id !== id : true))
        return {
          message: "Email already in use",
        };
    }

    if (!_.isEmpty(username)) {
      const checkUsername = await this.findOne({
        username,
      });

      if (checkUsername && (!_.isNil(id) ? checkUsername.id !== id : true))
        return {
          message: "Username already in use",
        };
    }

    return null;
  }
}

export default User;
