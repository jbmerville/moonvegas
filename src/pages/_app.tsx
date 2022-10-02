import { DAppProvider } from '@usedapp/core';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

import Layout from '@/components/layout/Layout';

import { currentDappConfig } from '@/config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={currentDappConfig}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DAppProvider>
  );
}
export default MyApp;
