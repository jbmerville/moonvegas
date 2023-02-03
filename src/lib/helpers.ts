import { currentNetwork } from '@/config';

/**
 * Function that return currency symbol
 * @param networks - The chains currently in use
 */
export function getCurrenNetworkCurrencySymbol(): string {
  return currentNetwork.nativeCurrency?.symbol || 'ERROR';
}

/**
 * Function that pauses execution
 * @param milliseconds - The amount of time to wait for, in milliseconds
 */
export async function wait(milliseconds: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
