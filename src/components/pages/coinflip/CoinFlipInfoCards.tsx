import { faBook, faCoins, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useContext } from 'react';

import InfoCards from '@/components/InfoCards';
import { InfoCardPropsType } from '@/components/InfoCards/InfoCard';

import { currentCoinFlipAddress, currentNetwork } from '@/config';
import CoinFlipContext from '@/contexts/CoinFlipContext';

const CoinFlipInfoCards = () => {
  const { coinFlipState, isCoinFlipStateFetching } = useContext(CoinFlipContext);

  const infoCard1: InfoCardPropsType = {
    title: `${coinFlipState.totalFlips} Flips`,
    subtitle: (
      <>
        <FontAwesomeIcon icon={faCoins} size='xs' className='mr-2 w-[13px]' />
        Total Flips
      </>
    ),
    isLoading: isCoinFlipStateFetching,
  };
  const infoCard2: InfoCardPropsType = {
    title: `${coinFlipState.totalVolume} ${currentNetwork.nativeCurrency?.symbol}`,
    subtitle: (
      <>
        <FontAwesomeIcon icon={faDollarSign} size='xs' className='mr-2 w-[9px]' />
        Total Volume
      </>
    ),
    isLoading: isCoinFlipStateFetching,
  };
  const infoCard3: InfoCardPropsType = {
    title: 'Read the Rules',
    subtitle: (
      <>
        <FontAwesomeIcon icon={faBook} size='xs' className='mr-2 w-[12px]' />
        How Does It Work?
      </>
    ),
  };
  const popUpBulletPoints: ReactNode[] = [
    <>
      Select either <span className='text-moonbeam-cyan'> HEADS or TAILS</span>, then choose the amount of{' '}
      {currentNetwork.nativeCurrency?.symbol} to flip.
    </>,
    <>
      The Smart Contract randomly flips a coin. If it is the one you picked, you win and you get back
      <span className='text-moonbeam-cyan'> 2x</span> your {currentNetwork.nativeCurrency?.symbol}. If it&apos;s not the
      one you picked, you lose your {currentNetwork.nativeCurrency?.symbol}. The house keeps 5% of all wins.
    </>,
  ];

  return (
    <InfoCards
      gameName='Coin Flip'
      description='Choose either heads or tails, select a bet amount, 50% chance of winning and doubling your bet or losing it all'
      infoCard1={infoCard1}
      infoCard2={infoCard2}
      infoCard3={infoCard3}
      popUpBulletPoints={popUpBulletPoints}
      smartContractAddress={currentCoinFlipAddress}
    />
  );
};

export default CoinFlipInfoCards;
