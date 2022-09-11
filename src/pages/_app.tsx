import { DAppProvider } from '@usedapp/core';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { currentDappConfig } from '@/config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={currentDappConfig}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}
export default MyApp;
