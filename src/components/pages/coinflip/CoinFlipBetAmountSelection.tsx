import React, { useState } from 'react';

import { getNetworkLogo } from '@/lib/helpers';

import Button from '@/components/buttons/Button';
import DevTokenLink from '@/components/DevTokenLink';
import CoinFlipBetAmountButton from '@/components/pages/coinflip/CoinFlipBetAmountButton';

import { useCoinFlipContext } from '@/contexts/CoinFlipContext';
import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

import { BetAmount, BetAmounts, CoinFace } from '@/types';

interface CoinFlipBetAmountSelectionPropsType {
  playerCoinFaceChoice?: CoinFace;
}

const CoinFlipBetAmountSelection = (props: CoinFlipBetAmountSelectionPropsType) => {
  const { playerCoinFaceChoice } = props;
  const { isTransactionPending, flip, transactionStatus } = useCoinFlipContext();
  const [currentSelectedBetAmount, setCurrentSelectedBetAmount] = useState<BetAmount>({ name: 'One', value: 1 });
  const { currentNetwork, colorAccent } = useCurrentNetworkContext();

  const onFlipClick = () => {
    flip(currentSelectedBetAmount, playerCoinFaceChoice);
  };

  return (
    <div className='layout flex flex-col items-center justify-center'>
      <div className='flex w-full flex-col items-start justify-start '>
        <div className='flex w-full items-center'>
          <p className={`text-${colorAccent} text-left text-lg font-bold md:text-3xl`}>Bet Amount</p>
        </div>
        <p className={`text-${colorAccent} text-left text-sm font-light opacity-80 md:text-lg`}>
          Select a bet amount. Max bet amount is capped based on smart contract balance.
        </p>
        <div className='flex w-full flex-col items-center justify-start '>
          <div className='my-10 grid w-full grid-cols-2 grid-rows-4 gap-4 md:grid-cols-4 md:grid-rows-2'>
            {BetAmounts.map((betAmount, index) => (
              <CoinFlipBetAmountButton
                betAmount={betAmount}
                key={index}
                setCurrentSelectedBetAmount={setCurrentSelectedBetAmount}
                isCurrentSelectedBetAmount={betAmount.value === currentSelectedBetAmount?.value}
              />
            ))}
          </div>
          <Button
            isLoading={isTransactionPending}
            className='relative  inline-flex w-full items-center justify-center overflow-hidden rounded-md p-0.5  text-sm font-medium text-white '
            onClick={onFlipClick}
          >
            {isTransactionPending ? (
              <span className='py-2.5 pl-2 text-lg font-extrabold uppercase text-white'>
                {transactionStatus === 'PendingSignature' ? 'Pending Signature' : transactionStatus}...
              </span>
            ) : (
              <span className='relative flex w-full items-center justify-center py-2.5 text-lg font-extrabold uppercase md:px-5'>
                <div className='scale-[1.5] pr-2'>{getNetworkLogo(currentNetwork.network.chainId)}</div>
                <p className=''>Double or Nothing</p>
              </span>
            )}
          </Button>
          <DevTokenLink />
        </div>
      </div>
    </div>
  );
};

export default CoinFlipBetAmountSelection;
