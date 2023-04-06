import axios from 'src/store/axios';
import { AppDispatch } from 'src/store';
import { RESOURCE_NAME } from 'src/utils/constant';

interface ActionUpdate<T extends Koperasi.Resource.ResourceName> {
  id: number;
  data: Koperasi.Resource.ResourceStructure[T];
}

export const setResource = <T extends Koperasi.Resource.ResourceName>(
  resourceName: T,
  payload: Koperasi.Resource.ResourceRecord<T>
) => ({
  type: `resources.${resourceName}.set`,
  payload,
});

export const updateResource = <T extends Koperasi.Resource.ResourceName>(
  resourceName: T,
  payload: ActionUpdate<T>
) => ({
  type: `resources.${resourceName}.update`,
  payload,
});

export const changePassword =
  (id: number, payload: Resource.UpdatePassword) => async () => {
    try {
      await axios.post(`/${RESOURCE_NAME.USERS}/${id}/password`, payload);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const overwriteResource = <T extends Koperasi.Resource.ResourceName>(
  resourceName: T,
  payload: Koperasi.Resource.ResourceRecord<T>
) => ({
  type: `resources.${resourceName}.overwrite`,
  payload,
});

export const deleteResource = <T extends Koperasi.Resource.ResourceName>(
  resourceName: T,
  id: number
) => ({
  type: `resources.${resourceName}.delete`,
  payload: id,
});

// overwrite state by default
export const getAllData =
  <T extends Koperasi.Resource.ResourceName>(
    resourceName: T,
    query = '',
    overwrite = true
  ) =>
  async () => {
    const { data } = await axios.get<Koperasi.Resource.ResourceRecord<T>>(
      `/${resourceName}?${query}`,
      {
        headers: {
          resourceName,
          overwrite,
        },
      }
    );

    return data as Koperasi.Resource.ResourceRecord<T>;
  };

// get resource base on id
export const getDataById =
  <T extends Koperasi.Resource.ResourceName>(
    resourceName: T,
    id: number,
    query = '',
    overwrite = false
  ) =>
  async () => {
    const { data } = await axios.get<Koperasi.Resource.ResourceStructure[T]>(
      `/${resourceName}/${id}?${query}`,
      {
        headers: {
          resourceName,
          overwrite,
        },
      }
    );

    return data as Koperasi.Resource.ResourceStructure[T];
  };

// Add new data to resource
export const addData =
  <T extends Koperasi.Resource.ResourceName>(resourceName: T) =>
  (payload: any) =>
  async (dispatch: AppDispatch) => {
    const { data } = await axios.post<Koperasi.Resource.ResourceStructure[T]>(
      `/${resourceName}`,
      payload,
      {
        headers: {
          resourceName,
        },
      }
    );

    dispatch(updateResource(resourceName, { id: data.id, data }));

    return data;
  };

// Update the data by id
export const updateData =
  <T extends Koperasi.Resource.ResourceName>(resourceName: T) =>
  (id: number, update: any, query = '') =>
  async () => {
    const { data } = await axios.patch<Koperasi.Resource.ResourceStructure[T]>(
      `/${resourceName}/${id}?${query}`,
      update,
      {
        headers: {
          resourceName,
        },
      }
    );

    console.log(id);

    return data as Koperasi.Resource.ResourceStructure[T];
  };

// Delete the data by id
export const deleteData =
  <T extends Koperasi.Resource.ResourceName>(
    resourceName: T,
    id: number,
    noRequest = false
  ) =>
  async (dispatch: AppDispatch) => {
    if (!noRequest) await axios.delete(`/${resourceName}/${id}`);

    return dispatch(deleteResource(resourceName, id));
  };
