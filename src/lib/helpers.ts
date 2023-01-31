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

/**
 * Function that pauses execution
 * @param milliseconds - The amount of time to wait for, in milliseconds
 */
export async function wait(milliseconds: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
