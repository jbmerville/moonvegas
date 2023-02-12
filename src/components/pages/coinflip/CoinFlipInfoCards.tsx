import { faBook, faCoins, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';

import InfoCards from '@/components/InfoCards';
import { InfoCardPropsType } from '@/components/InfoCards/InfoCard';

import { useCoinFlipContext } from '@/contexts/CoinFlipContext';
import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

const CoinFlipInfoCards = () => {
  const { coinFlipState, isCoinFlipStateFetching } = useCoinFlipContext();
  const { currentNetwork } = useCurrentNetworkContext();

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
    title: `${coinFlipState.totalVolume} ${currentNetwork.currencySymbol}`,
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
      Draws are set to a <span className='text-${colorAccent}'> 50/50</span> chance of HEADS or TAILS winning.
    </>,
    <>
      If you picked the <span className='text-${colorAccent}'>same face as the one fliped</span>, you win and you get
      back double your {currentNetwork.currencySymbol} in the same transaction.
    </>,
    <>
      If you picked the <span className='text-${colorAccent}'>opposite face as the one fliped</span>, you lost and the
      smart contract keeps your {currentNetwork.currencySymbol}.
    </>,
    <>
      <span className='text-${colorAccent}'>
        The bigger the smart contract balance, the bigger the allowed bet amount
      </span>
      . This is so the pool does not get emptied after a few lucky flips in a row.
    </>,
  ];

  return (
    <InfoCards
      gameName='Coin Flip'
      description='Choose either heads or tails, select a bet amount, 50% chance of winning and doubling your bet or losing it all.'
      infoCard1={infoCard1}
      infoCard2={infoCard2}
      infoCard3={infoCard3}
      popUpBulletPoints={popUpBulletPoints}
      smartContractAddress={currentNetwork.coinFlipAddress}
    />
  );
};

export default CoinFlipInfoCards;
