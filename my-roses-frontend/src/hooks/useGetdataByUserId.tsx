import { useState } from 'react';
import { getAllData } from 'src/store/actions/resources';
import useCustomDebounce from './useCustomDebounce';

const useGetAllByQuery = <T extends Koperasi.Resource.ResourceName>(
  resourceName: T,
  query: string = ''
) => {
  const [data, setData] = useState<Koperasi.Resource.ResourceRecord<T>>();

  useCustomDebounce(
    async () => {
      if (!query) return;

      const data = await getAllData(resourceName, query)();
      setData(data);
    },
    500,
    [query]
  );

  return data?.rows ?? [];
};

export default useGetAllByQuery;
