import { Chain } from '@usedapp/core';
import React, { useState } from 'react';

import { getNetworkFromChainId, getNetworkLogo } from '@/lib/helpers';

import Button from '@/components/buttons/Button';

import { availableNetworks } from '@/config';
import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

interface HeaderNetworkSelectPropsType {
  className?: string;
}
const HeaderNetworkSelect = (props: HeaderNetworkSelectPropsType) => {
  const { className } = props;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { currentNetwork, changeNetwork } = useCurrentNetworkContext();

  const handleChangeNetwork = async (network: Chain) => {
    changeNetwork(network.chainId);
  };

  const renderNonCurrentAvailableNetworks = () => {
    return availableNetworks
      .filter((network) => network.chainId !== currentNetwork.network.chainId)
      .map((network) => {
        return (
          <li key={network.chainId} onClick={() => handleChangeNetwork(network)}>
            <div className='flex items-center justify-center rounded p-2 hover:bg-moonbeam-grey-dark'>
              {renderNetwork(network)}
            </div>
          </li>
        );
      });
  };

  const renderNetwork = (network: Chain) => {
    return (
      <div className='flex w-max items-center justify-center'>
        {getNetworkLogo(network.chainId)}
        <p className='ml-2 flex w-max'>{network.chainName}</p>
      </div>
    );
  };

  return (
    <div className={`flex w-max ${className}`}>
      <Button
        variant='dark'
        className='flex w-[190px] items-center justify-center'
        onMouseEnter={() => setIsSelectOpen(true)}
        onMouseLeave={() => setIsSelectOpen(false)}
      >
        {renderNetwork(getNetworkFromChainId(currentNetwork.network.chainId))}
      </Button>
      {isSelectOpen && (
        <div
          className='absolute z-10 mt-[42px]  w-[190px] rounded bg-moonbeam-grey shadow'
          onMouseEnter={() => setIsSelectOpen(true)}
          onMouseLeave={() => setIsSelectOpen(false)}
        >
          <ul className='cursor-pointer space-y-1 p-2  text-gray-200'>{renderNonCurrentAvailableNetworks()}</ul>
        </div>
      )}
    </div>
  );
};

export default HeaderNetworkSelect;
