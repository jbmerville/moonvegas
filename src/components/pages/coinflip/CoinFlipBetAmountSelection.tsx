import React, { useEffect, useState } from 'react';

import { getNetworkLogo } from '@/lib/helpers';

import Button from '@/components/buttons/Button';
import DevTokenLink from '@/components/DevTokenLink';
import CoinFlipBetAmountButton from '@/components/pages/coinflip/CoinFlipBetAmountButton';

import { useCoinFlipContext } from '@/contexts/CoinFlipContext';
import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

import { CoinFace } from '@/types';

interface CoinFlipBetAmountSelectionPropsType {
  playerCoinFaceChoice?: CoinFace;
}

const CoinFlipBetAmountSelection = (props: CoinFlipBetAmountSelectionPropsType) => {
  const { playerCoinFaceChoice } = props;
  const { isTransactionPending, flip, transactionStatus } = useCoinFlipContext();
  const { currentNetwork, colorAccent } = useCurrentNetworkContext();
  const [currentSelectedBetAmount, setCurrentSelectedBetAmount] = useState(currentNetwork.betAmounts[0]);

  const onFlipClick = () => {
    flip(currentSelectedBetAmount, playerCoinFaceChoice);
  };

  useEffect(() => {
    setCurrentSelectedBetAmount(currentNetwork.betAmounts[0]);
  }, [currentNetwork.betAmounts]);

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
            {currentNetwork.betAmounts.map((betAmount, index) => (
              <CoinFlipBetAmountButton
                betAmount={betAmount}
                key={index}
                setCurrentSelectedBetAmount={setCurrentSelectedBetAmount}
                isCurrentSelectedBetAmount={betAmount === currentSelectedBetAmount}
              />
            ))}
          </div>
          <Button
            isLoading={isTransactionPending}
            className='relative  inline-flex w-full items-center justify-center overflow-hidden rounded-md p-0.5 text-sm font-medium text-white md:text-lg '
            onClick={onFlipClick}
          >
            {isTransactionPending ? (
              <span className='py-2.5 pl-2 font-extrabold uppercase text-white'>
                {transactionStatus === 'PendingSignature' ? 'Pending Signature' : transactionStatus}...
              </span>
            ) : (
              <span className='relative flex w-full items-center justify-center py-2.5 font-extrabold uppercase md:px-5'>
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
