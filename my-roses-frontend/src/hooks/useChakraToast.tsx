import { useCallback } from 'react';
import { useToast, UseToastOptions } from '@chakra-ui/react';

const useChakraToast = (options: UseToastOptions = {}) => {
  const toast = useToast();

  const toastCb = useCallback(
    (
      message = 'Kesalahan pada server',
      status: UseToastOptions['status'] = 'success'
    ) =>
      toast({
        position: 'top-right',
        description: message,
        isClosable: true,
        duration: 2500,
        variant: 'solid',
        ...options,
        status,
      }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return toastCb;
};

export default useChakraToast;
