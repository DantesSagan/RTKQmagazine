import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import { Provider } from 'react-redux';
import store from '../components/app/store/store';
import { extendedBasketSlice } from '../components/features/cakes/CakesSlice';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // const [showChild, setShowChild] = useState(false);
  // useEffect(() => {
  //   setShowChild(true);
  // }, []);
  // if (!showChild) {
  //   return null;
  // }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
