import { useState } from 'react';
import { getDataById } from 'src/store/actions/resources';
import useCustomDebounce from './useCustomDebounce';

const useGetDataById = <T extends Koperasi.Resource.ResourceName>(
  resourceName: T,
  id: number
) => {
  const [data, setData] = useState<Koperasi.Resource.ResourceStructure[T]>();

  useCustomDebounce(
    async () => {
      if (!id) return;

      const data = await getDataById(resourceName, id)();
      setData(data);
    },
    500,
    [id]
  );

  return data;
};

export default useGetDataById;
