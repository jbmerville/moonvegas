import { MoonbaseAlpha } from '@usedapp/core';
import React from 'react';

import UnderlineLink from '@/components/links/UnderlineLink';

import { getCurrentNetworkChainId } from '@/config';

const DevTokenLink = () => {
  if (getCurrentNetworkChainId() === MoonbaseAlpha.chainId) {
    return (
      <p className='mt-2 text-xs text-white '>
        Get DEV tokens at the{' '}
        <UnderlineLink href='https://apps.moonbeam.network/moonbase-alpha/faucet/'>Moonbase Alpha Faucet</UnderlineLink>
        .
      </p>
    );
  }
  return <></>;
};

export default DevTokenLink;
