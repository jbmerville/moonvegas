import { Chain, MoonbaseAlpha, Moonriver } from '@usedapp/core';
import { utils } from 'ethers/lib/ethers';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';

import EthereumIcon from '@/components/icons/EthereumIcon';
import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import MoonriverIcon from '@/components/icons/MoonriverIcon';

import { availableNetworks, chains } from '@/config';

/**
 * Function that pauses execution
 * @param milliseconds - The amount of time to wait for, in milliseconds
 */
export async function wait(milliseconds: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * Function that gets the logo of supported network, if network logo doesn't exist, default to Moonbeam logo.
 * @param chainId - The network chainId
 */
export function getNetworkLogo(chainId: number, circle?: boolean): ReactNode {
  if (chainId === Moonriver.chainId) {
    if (circle) {
      return (
        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-black/30'>
          <MoonriverIcon />
        </div>
      );
    }
    return <MoonriverIcon />;
  }

  if (chainId === MoonbaseAlpha.chainId) {
    return <EthereumIcon />;
  }

  // Default value
  if (circle) {
    return (
      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-black/30'>
        <MoonbeamIcon />
      </div>
    );
  }
  return <MoonbeamIcon />;
}

/**
 * Function to switch netwok
 * @param network - The network to switch to
 */
export async function changeNetwork(network: Chain): Promise<void> {
  // const network = getNetworkFromChainId(chaindId);
  if (window && window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainName: network.chainName,
            chainId: utils.hexStripZeros(utils.hexlify(network.chainId)),
            nativeCurrency: network.nativeCurrency,
            rpcUrls: [network.rpcUrl],
          },
        ],
      });
      toast.dark(`Connected to ${network.chainName}`, { type: toast.TYPE.INFO });
    } catch (error) {
      console.error(`Error connecting to ${network.chainName}`, error);
      toast.dark(`Error connecting to ${network.chainName}`, { type: toast.TYPE.ERROR });
    }
  }
}

export function getNetworkFromChainId(chaindId?: number): Chain {
  const networks = availableNetworks.filter((network) => network.chainId === chaindId);
  if (networks.length === 0) {
    return chains[MoonbaseAlpha.chainId];
  }
  return networks[0];
}
