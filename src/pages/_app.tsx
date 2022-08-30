/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { AppProps } from 'next/app';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purpo ses, remove @/styles/colors.css import immediately
// import '@/styles/colors.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={1287}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
export default MyApp;
