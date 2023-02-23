import { faClock, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Countdown from 'react-countdown';

import useIsMobile from '@/hooks/useIsMobile';

import InfoCard, { InfoCardPropsType } from '@/components/InfoCards/InfoCard';

import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';
import { useRaffleContext } from '@/contexts/RaffleContext';

const EndRaffleSection = () => {
  const { raffleState, isRaffleStateFetching, endRaffle } = useRaffleContext();
  const isRaffleOver = raffleState.draftTime.getTime() < Date.now();
  const { colorAccent, currentNetwork, colorAccentText } = useCurrentNetworkContext();
  const isMobile = useIsMobile();

  const raffleEndTimerInfCard: InfoCardPropsType = {
    title: <Countdown key={raffleState.draftTime.getTime()} date={raffleState.draftTime} />,
    subtitle: (
      <>
        <FontAwesomeIcon icon={faClock} size='xs' className='mr-2 mt-1 w-[14px]' />
        Ends
      </>
    ),
    isLoading: isRaffleStateFetching,
  };

  const endRaffleButtonInfoCard: InfoCardPropsType = {
    title: <div className='mt-[7px] uppercase text-inherit md:text-xl'>End Raffle</div>,
    subtitle: <></>,
  };

  return (
    <div className='grid w-full grid-rows-2 items-center gap-3 md:grid-cols-3 md:grid-rows-1 md:gap-5'>
      <InfoCard {...raffleEndTimerInfCard} />
      <InfoCard
        {...endRaffleButtonInfoCard}
        onClick={endRaffle}
        className={`mt-1 bg-${colorAccent} text-${colorAccentText}`}
      />
      <div className='flex h-full flex-col justify-around  text-sm text-white'>
        <div>
          {isMobile ? <>&uarr;</> : <>&larr;</>} Click this button to end the{' '}
          <span className={`text-${colorAccent}`}>{currentNetwork.network.chainName}</span> raffle
        </div>
        <p className='mt-6 text-white/50 md:mt-0'>
          <FontAwesomeIcon icon={faInfoCircle} size='sm' className='mr-2 inline w-[13px] text-moonbase-alpha-accent' />
          Ending the raffle picks a random winner. Sends{' '}
          <span className='text-${colorAccent}'>{100 - raffleState.royalty}%</span> of all the{' '}
          {currentNetwork.currencySymbol} in the pool to the winner, and{' '}
          <span className='text-${colorAccent}'>{raffleState.royalty}%</span> to the admin account (this account). It
          also starts the next raffle
        </p>
      </div>
    </div>
  );
};

export default EndRaffleSection;
