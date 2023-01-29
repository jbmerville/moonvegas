import React, { useContext, useState } from 'react';

import Button from '@/components/buttons/Button';
import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import UnderlineLink from '@/components/links/UnderlineLink';
import BetAmountButton from '@/components/pages/coinflip/BetAmountButton';

import CoinFlipContext from '@/contexts/CoinFlipContext';

import { BetAmount, BetAmounts, CoinFace } from '@/types';

interface BetAmountSelectionPropsType {
  playerCoinFaceChoice?: CoinFace;
}

const BetAmountSelection = (props: BetAmountSelectionPropsType) => {
  const { playerCoinFaceChoice } = props;
  const { isTransactionPending, flip, transactionStatus } = useContext(CoinFlipContext);
  const [currentSelectedBetAmount, setCurrentSelectedBetAmount] = useState<BetAmount>({ name: 'One', value: 1 });

  const onFlipClick = () => {
    flip(playerCoinFaceChoice, currentSelectedBetAmount);
  };

  return (
    <div className='layout mx-10 flex items-center justify-between md:mx-4'>
      <div className='flex w-full flex-col items-start justify-start '>
        <div className='flex w-full items-center'>
          <p className='text-left text-lg font-bold text-moonbeam-cyan md:text-3xl'>Selected Tickets</p>
        </div>
        <p className='text-left text-xs text-moonbeam-cyan opacity-80 md:text-lg'>
          Select a bet amount. Max bet amount is capped based on pool balance.
        </p>
        <div className='flex w-full flex-col items-center justify-start '>
          <div className='my-10 grid w-full grid-cols-2 grid-rows-4 gap-4 md:grid-cols-4 md:grid-rows-2'>
            {BetAmounts.map((betAmount, index) => (
              <BetAmountButton
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
              <span className='py-2.5 text-lg font-extrabold uppercase text-white'>
                {transactionStatus === 'PendingSignature' ? 'Pending Signature' : transactionStatus}...
              </span>
            ) : (
              <span className='relative flex w-full items-center justify-center px-5 py-2.5 text-lg font-extrabold uppercase'>
                <p className='ml-2 '>Double or Nothing</p>
                <div className='scale-[1.5] pl-2'>
                  <MoonbeamIcon />
                </div>
              </span>
            )}
          </Button>
          <p className='mt-2 text-xs text-white'>
            Get DEV tokens at the{' '}
            <UnderlineLink href='https://apps.moonbeam.network/moonbase-alpha/faucet/'>
              Moonbase Alpha Faucet
            </UnderlineLink>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default BetAmountSelection;
