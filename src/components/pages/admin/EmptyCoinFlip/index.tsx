import { faDollarSign, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import InfoCard, { InfoCardPropsType } from '@/components/InfoCards/InfoCard';
import EmptyCoinFlipForm from '@/components/pages/admin/EmptyCoinFlip/EmptyCoinFlipForm';

import { useCoinFlipContext } from '@/contexts/CoinFlipContext';
import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

const EmptyCoinFlip = () => {
  const { coinFlipState, isCoinFlipStateFetching } = useCoinFlipContext();
  const { colorAccent, currentNetwork } = useCurrentNetworkContext();
  const isMobile = useIsMobile();
  const [value, setValue] = useState(0);

  const coinFlipBalanceCard: InfoCardPropsType = {
    title: (
      <div>
        {coinFlipState.contractBalance.toFixed(2)} {currentNetwork.currencySymbol}
      </div>
    ),

    subtitle: (
      <>
        <FontAwesomeIcon icon={faDollarSign} size='sm' className='mr-1 mt-1 w-[15px]' />
        Smart Contract Balance
      </>
    ),
    isLoading: isCoinFlipStateFetching,
  };

  const computeNewMaxBetAmount = (value: number, isAdding: boolean): string => {
    if (isAdding) {
      return ((coinFlipState.contractBalance + value) / 4).toFixed(2);
    }
    return ((coinFlipState.contractBalance - value) / 4).toFixed(2);
  };

  return (
    <div className='flex w-full flex-col items-center md:grid  md:grid-cols-3 md:grid-rows-1 md:gap-5'>
      <InfoCard {...coinFlipBalanceCard} className='mb-4 w-full md:mb-0' />
      <EmptyCoinFlipForm setValue={setValue} value={value} />
      <div className='mt-3 flex h-full flex-col justify-around  text-sm text-white md:mt-0'>
        <div>
          {isMobile ? <>&uarr;</> : <>&larr;</>} Add or remove {currentNetwork.currencySymbol} from the{' '}
          <span className={`text-${colorAccent}`}>{currentNetwork.network.chainName}</span> coin flip
        </div>
        <p className='mt-6 text-white/50 md:mt-0'>
          <FontAwesomeIcon icon={faInfoCircle} size='sm' className='mr-2 inline w-[13px] text-moonbase-alpha-accent' />
          {value === 0 ? (
            <>
              This will impact the max bet amount allowed for this smart contract. Currently the max bet is{' '}
              {coinFlipState.maxPoolBetAmount.toFixed(2)} {currentNetwork.currencySymbol} (1/4 of balance)
            </>
          ) : (
            <>
              New max bet amount after adding: {computeNewMaxBetAmount(value, true)} {currentNetwork.currencySymbol},
              removing: {computeNewMaxBetAmount(value, false)} {currentNetwork.currencySymbol}, currently:{' '}
              {coinFlipState.maxPoolBetAmount.toFixed(2)} {currentNetwork.currencySymbol}
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default EmptyCoinFlip;
