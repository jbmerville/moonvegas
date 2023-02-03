import { Chain, Config, MoonbaseAlpha, Moonbeam } from '@usedapp/core';
import coinFlipAddressLocalhost from 'hardhat/sc-addresses/localhost/CoinFlip.address.js';
import raffleAddressLocalhost from 'hardhat/sc-addresses/localhost/Raffle.address.js';
import coinFlipAddressMoonbaseAlpha from 'hardhat/sc-addresses/moonbase-alpha/CoinFlip.address.js';
import raffleAddresssMoonbaseAlpha from 'hardhat/sc-addresses/moonbase-alpha/Raffle.address.js';
import coinFlipAddressMoonbeam from 'hardhat/sc-addresses/moonbeam/CoinFlip.address.js';
import raffleAddressMoonbeam from 'hardhat/sc-addresses/moonbeam/Raffe.address';
export const LocalhostChain: Chain = {
  chainId: 1281,
  chainName: 'Moonbeam Localhost',
  isTestChain: true,
  isLocalChain: true,
  multicallAddress: '0x0000000000000000000000000000000000000000',
  getExplorerAddressLink: (address: string) => `https://tutorialchain.etherscan.io/address/${address}`,
  getExplorerTransactionLink: (transactionHash: string) => `https://tutorialchain.etherscan.io/tx/${transactionHash}`,
  // Optional parameters:
  rpcUrl: 'http://127.0.0.1:9933',
  blockExplorerUrl: 'https://tutorialchain.etherscan.io',
  nativeCurrency: {
    name: 'GLMR',
    symbol: 'GLMR',
    decimals: 18,
  },
};

export const LocalhostConfig: Config = {
  networks: [LocalhostChain],
  readOnlyChainId: LocalhostChain.chainId,
  readOnlyUrls: {
    [LocalhostChain.chainId]: 'http://127.0.0.1:9933',
  },
};

export const currentNetworkChainId = () => {
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    return Moonbeam.chainId;
  }
  if (process.env.NEXT_PUBLIC_ENV === 'development') {
    return MoonbaseAlpha.chainId;
  }
  return LocalhostChain.chainId;
};

export const dappConfig = {
  [LocalhostChain.chainId]: LocalhostConfig,
  [MoonbaseAlpha.chainId]: {
    ...MoonbaseAlpha,
    readOnlyChainId: MoonbaseAlpha.chainId,
    nativeCurrency: {
      name: 'DEV',
      symbol: 'DEV',
      decimals: 18,
    },
    readOnlyUrls: { [MoonbaseAlpha.chainId]: MoonbaseAlpha.rpcUrl },
  },
  [Moonbeam.chainId]: {
    ...Moonbeam,
    nativeCurrency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18,
    },
    readOnlyChainId: Moonbeam.chainId,
    readOnlyUrls: { [Moonbeam.chainId]: Moonbeam.rpcUrl },
  },
};

export const contractConfig = {
  [LocalhostChain.chainId]: {
    raffleAddress: raffleAddressLocalhost,
    coinFlipAddress: coinFlipAddressLocalhost,
  },
  [MoonbaseAlpha.chainId]: {
    raffleAddress: raffleAddresssMoonbaseAlpha,
    coinFlipAddress: coinFlipAddressMoonbaseAlpha,
  },
  [Moonbeam.chainId]: {
    raffleAddress: raffleAddressMoonbeam,
    coinFlipAddress: coinFlipAddressMoonbeam,
  },
};

export const explorerApiEndpoints = {
  [MoonbaseAlpha.chainId]: 'https://api-moonbase.moonscan.io/api',
  [Moonbeam.chainId]: 'https://api-moonbeam.moonscan.io/api',
};

export const currentNetwork = dappConfig[currentNetworkChainId()] as Chain;
export const currentRaffleAddress = contractConfig[currentNetworkChainId()].raffleAddress;
export const currentCoinFlipAddress = contractConfig[currentNetworkChainId()].coinFlipAddress;
export const currentExplorerApi = explorerApiEndpoints[currentNetworkChainId()];

// To override the currentNetwork, set the NEXT_PUBLIC_ENV variable to "production" in .env
export const currentDappConfig = dappConfig[currentNetworkChainId()] as Config;
console.log(currentDappConfig.readOnlyChainId);

// eslint-disable-next-line no-console
console.log({
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
  currentNetwork: currentNetwork.chainName,
});
