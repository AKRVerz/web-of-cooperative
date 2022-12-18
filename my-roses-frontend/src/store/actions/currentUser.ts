import _ from 'lodash';
import axios from 'src/store/axios';
import { UserRole } from 'src/types/resources';
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
      const { data } = await axios.post<{
        id: number;
        token: string;
        role: UserRole;
      }>('/auth/login', payload);

      SessionUtils.setToken(data.token);

      return data;
    } catch (e) {
      return Promise.reject(e);
    }
  };
