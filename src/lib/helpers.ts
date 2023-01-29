import { Chain } from '@usedapp/core';

/**
 * Function that return currency symbol
 * @param networks - The chains currently in use
 */
export function getCurrenNetworkCurrencySymbol(networks?: Chain[]): string {
  if (networks && networks.length > 0) {
    return networks[0].nativeCurrency?.symbol || 'UNKNOWN';
  }
  return 'ERROR';
}
