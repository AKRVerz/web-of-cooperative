import _ from 'lodash';
import axios from 'axios';
import { AppDispatch } from 'src/store';
import SessionUtils from 'src/utils/sessionUtils';
import {
  overwriteResource,
  setResource,
  updateResource,
} from './actions/resources';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const applyInterceptors = (dispatch: AppDispatch) => {
  instance.interceptors.request.use(
    (conf) => {
      const token = SessionUtils.getToken();
      const config = conf;

      if (config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';

        if (_.isString(config.headers.resourceName))
          config.resourceName = config.headers
            .resourceName as Koperasi.Resource.ResourceName;

        if (config.headers.overwrite)
          config.overwrite = config.headers.overwrite == 'true';
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  instance.interceptors.response.use((res) => {
    const { config, data } = res;

    if (!config.resourceName) return res;

    if (config.overwrite) {
      dispatch(overwriteResource(config.resourceName, data));
    } else if (config.method === 'patch') {
      dispatch(updateResource(config.resourceName, { id: data.id, data }));
    } else {
      dispatch(setResource(config.resourceName, data));
    }

    return res;
  });
};

export default instance;
