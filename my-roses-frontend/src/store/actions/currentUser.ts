import _ from 'lodash';
import axios from 'src/store/axios';
import SessionUtils from 'src/utils/sessionUtils';

export const userLogin =
  (
    payload: Pick<
      Koperasi.Resource.ResourceStructure['users'],
      'email' | 'password'
    >
  ) =>
  async () => {
    try {
      const { data } = await axios.post<{ id: number; token: string }>(
        '/auth/login',
        payload
      );

      SessionUtils.setToken(data.token);
    } catch (e) {
      return Promise.reject(e);
    }
  };
