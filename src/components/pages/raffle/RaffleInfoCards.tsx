import { faBook, faClock, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useContext } from 'react';
import Countdown from 'react-countdown';

import InfoCards from '@/components/InfoCards';
import { InfoCardPropsType } from '@/components/InfoCards/InfoCard';

import { currentNetwork, currentRaffleAddress } from '@/config';
import RaffleContext from '@/contexts/RaffleContext';

const RaffleInfoCards = () => {
  const { raffleState } = useContext(RaffleContext);
  const infoCard1: InfoCardPropsType = {
    title: `${raffleState.ticketsLeft.length}/${raffleState.maxTicketAmount}`,
    subtitle: (
      <>
        <FontAwesomeIcon icon={faReceipt} size='xs' className='mr-2 w-[10px]' />
        Tickets Left
      </>
    ),
  };
  const infoCard2: InfoCardPropsType = {
    title: <Countdown key={raffleState.draftTime.getTime()} date={raffleState.draftTime} />,
    subtitle: (
      <>
        <FontAwesomeIcon icon={faClock} size='xs' className='mr-2 w-[14px]' />
        Ends
      </>
    ),
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
      Each ticket has the <span className='text-moonbeam-cyan'> same chance </span>
      of being selected.
    </>,
    <>
      Winner is picked when either all tickets are{' '}
      <span className='text-moonbeam-cyan'>sold out or the timer ends</span>. Whichever comes first.
    </>,
    <>
      Winner receives <span className='text-moonbeam-cyan'>{100 - raffleState.royalty}%</span> of all the{' '}
      {currentNetwork.nativeCurrency?.symbol} in the pool. The house keeps {raffleState.royalty}%.
    </>,
    <>
      Raffle <span className='text-moonbeam-cyan'>restarts automatically</span> after the end of every raffle.
    </>,
    <>
      At the end of each round, the raffle is{' '}
      <span className='text-moonbeam-cyan'>reset with one more ticket than the previous round</span>.
    </>,
  ];

  return (
    <InfoCards
      gameName='Raffle'
      description='Buy tickets, when tickets are sold out, one random ticket receives all the funds in the pool.'
      infoCard1={infoCard1}
      infoCard2={infoCard2}
      infoCard3={infoCard3}
      popUpBulletPoints={popUpBulletPoints}
      smartContractAddress={currentRaffleAddress}
    />
  );
};

export default RaffleInfoCards;
