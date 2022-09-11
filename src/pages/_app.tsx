import { Config, DAppProvider } from '@usedapp/core';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { currentNetworkChainId, dappConfig } from '@/config';

// To override the currentNetwork, set the NEXT_PUBLIC_ENV variable to "production" in .env
export const currentDappConfig = dappConfig[currentNetworkChainId] as Config;

// eslint-disable-next-line no-console
console.log({
  currentNetworkChainId,
  currentDappConfig,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={currentDappConfig}>
      <Component {...pageProps} />
    </DAppProvider>
  );
}
export default MyApp;
