import { Chain, Config, MoonbaseAlpha } from '@usedapp/core';
import raffleAddress from 'hardhat/Raffle.address.js';

export const LocalhostChain: Chain = {
  chainId: 1281,
  chainName: 'Moonbeam localhost',
  isTestChain: true,
  isLocalChain: true,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) =>
    `https://tutorialchain.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) =>
    `https://tutorialchain.etherscan.io/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'http://127.0.0.1:9933',
  blockExplorerUrl: 'https://tutorialchain.etherscan.io',
  nativeCurrency: {
    name: 'LOCAL',
    symbol: 'LOCAL',
    decimals: 18,
  },
};

export const localhostConfig: Config = {
  networks: [LocalhostChain],
  readOnlyChainId: LocalhostChain.chainId,
  readOnlyUrls: {
    [LocalhostChain.chainId]: 'http://127.0.0.1:9933',
  },
};

export const moonbaseAplhaConfig: Config = {
  networks: [MoonbaseAlpha],
  readOnlyChainId: MoonbaseAlpha.chainId,
  readOnlyUrls: {
    [MoonbaseAlpha.chainId]: 'https://rpc.api.moonbase.moonbeam.network',
  },
};

export const dappConfig = {
  [LocalhostChain.chainId]: localhostConfig,
  [MoonbaseAlpha.chainId]: moonbaseAplhaConfig,
};

export const isMoonbaseAlpha =
  process.env.NEXT_PUBLIC_ENV === 'production' || process.env.NEXT_PUBLIC_ENV === 'pipeline';

// eslint-disable-next-line no-console
console.log({ NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV, isMoonbaseAlpha });

export const contractConfig = {
  [LocalhostChain.chainId]: {
    raffleAddress: raffleAddress,
  },
  [MoonbaseAlpha.chainId]: {
    raffleAddress: '0x51D139132bDa837d5d83A529Fac06E79cf068977',
  },
};

export const currentNetworkChainId = isMoonbaseAlpha
  ? MoonbaseAlpha.chainId
  : LocalhostChain.chainId;

export const currentRaffleAddress = contractConfig[currentNetworkChainId].raffleAddress;

// To override the currentNetwork, set the NEXT_PUBLIC_ENV variable to "production" in .env
export const currentDappConfig = dappConfig[currentNetworkChainId] as Config;
