import { Chain } from '@usedapp/core';

import { getCurrenNetworkCurrencySymbol } from '@/lib/helpers';

describe('getCurrenNetworkCurrencySymbol function should work correctly', () => {
  it('Return an error given no network', () => {
    const networks: Chain[] = [];
    const result = getCurrenNetworkCurrencySymbol(networks);

    expect(result).toEqual('ERROR');
  });

  it('Return the current network currency symbol given one network', () => {
    const networks: Chain[] = [
      {
        chainId: 1,
        chainName: 'chainName',
        isTestChain: true,
        isLocalChain: true,
        multicallAddress: '0x0000000000000000000000000000000000000000',
        getExplorerAddressLink: () => ``,
        getExplorerTransactionLink: () => ``,
        nativeCurrency: {
          name: 'currenyName',
          symbol: 'currenySymbol',
          decimals: 18,
        },
      },
    ];
    const result = getCurrenNetworkCurrencySymbol(networks);

    expect(result).toEqual('currenySymbol');
  });

  it('Return the current network currency symbol given multiple networks', () => {
    const networks: Chain[] = [
      {
        chainId: 1,
        chainName: 'chainName',
        isTestChain: true,
        isLocalChain: true,
        multicallAddress: '0x0000000000000000000000000000000000000000',
        getExplorerAddressLink: () => ``,
        getExplorerTransactionLink: () => ``,
        nativeCurrency: {
          name: 'currenyName',
          symbol: 'currenySymbol1',
          decimals: 18,
        },
      },
      {
        chainId: 1,
        chainName: 'chainName',
        isTestChain: true,
        isLocalChain: true,
        multicallAddress: '0x0000000000000000000000000000000000000000',
        getExplorerAddressLink: () => ``,
        getExplorerTransactionLink: () => ``,
        nativeCurrency: {
          name: 'currenyName',
          symbol: 'currenySymbol2',
          decimals: 18,
        },
      },
    ];
    const result = getCurrenNetworkCurrencySymbol(networks);

    expect(result).toEqual('currenySymbol1');
  });

  it('Return the current network currency symbol given a network with no native currency', () => {
    const networks: Chain[] = [
      {
        chainId: 1,
        chainName: 'chainName',
        isTestChain: true,
        isLocalChain: true,
        multicallAddress: '0x0000000000000000000000000000000000000000',
        getExplorerAddressLink: () => ``,
        getExplorerTransactionLink: () => ``,
      },
    ];
    const result = getCurrenNetworkCurrencySymbol(networks);

    expect(result).toEqual('UNKNOWN');
  });
});
