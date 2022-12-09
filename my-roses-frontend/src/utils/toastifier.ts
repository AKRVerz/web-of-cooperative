import _ from 'lodash';
import { toast, ToastOptions } from 'react-toastify';
import useChakraToast from 'src/hooks/useChakraToast';

export const errorToastfier = (
  toast: ReturnType<typeof useChakraToast>,
  err: any
) => {
  const response = err.response?.data;
  const errObj = response?.errors;

  if (errObj) {
    _.forEach(errObj, (error) => {
      toast(`${error}`, 'error');
    });

    return;
  }

  toast(response?.message || 'Silahkan coba lagi!', 'error');
};

export const toastfier = (message: string, options: ToastOptions = {}) =>
  toast(message, options);
