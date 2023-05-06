import '../styles/globals.css';
import 'moment/locale/id';
import Head from 'next/head';
import moment from 'moment';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';
import customTheme from 'src/utils/customTheme';
import store from 'src/store';

moment.locale('id');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastContainer />
      <ChakraProvider theme={customTheme}>
        <Head>
          <title>Koperasi Argo Mulyo Lestari</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
