import { Provider } from 'react-redux';
import { store } from './store';  

import type { AppProps } from 'next/app';
import dotenv from 'dotenv';
dotenv.config();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
