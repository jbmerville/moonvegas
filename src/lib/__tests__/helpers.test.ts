import { getCurrenNetworkCurrencySymbol } from '@/lib/helpers';

describe('getCurrenNetworkCurrencySymbol function should work correctly', () => {
  it('Return an error given no network', () => {
    const result = getCurrenNetworkCurrencySymbol();

    expect(result).toEqual('DEV');
  });
});
