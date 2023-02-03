import { utils } from 'ethers';
import React, { ReactNode, useContext } from 'react';

import { getCurrenNetworkCurrencySymbol } from '@/lib/helpers';
import useIsMobile from '@/hooks/useIsMobile';

import Button from '@/components/buttons/Button';
import DevTokenLink from '@/components/DevTokenLink';
import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import Ticket from '@/components/pages/raffle/Ticket';
import { getMaxTicketPerTx, getNonDefaultTicketsSelected } from '@/components/pages/raffle/utils';

import RaffleContext from '@/contexts/RaffleContext';

import { TicketType } from '@/types';

interface TicketsSelectedPropsType {
  selectedTickets: TicketType[];
  toggleSelectedTickets: (ticket: TicketType) => void;
  resetTicketsSelected: () => void;
}

const TicketsSelected = (props: TicketsSelectedPropsType) => {
  const { raffleState, purchase, isTransactionPending, transactionStatus } = useContext(RaffleContext);
  const isMobile = useIsMobile();
  const maxTicketPerTx = getMaxTicketPerTx(isMobile);
  const nonDefaultTicketsSelected = getNonDefaultTicketsSelected(props.selectedTickets);

  const renderMiniatureSelectedTicket = (ticket: TicketType, index: number): ReactNode => {
    // Render black shade ticket instead of the one selected by the player.
    if (!ticket.isSelected) {
      return (
        <div key={index} className='mx-[0px] mb-[-40px] mt-[-90px] md:mx-[0px] md:mb-[-110px] md:mt-[-215px] '>
          <Ticket
            ticket={ticket}
            removeHead
            toggleSelectedTickets={props.toggleSelectedTickets}
            displayShimmer={true}
          />
        </div>
      );
    }

    // Render the ticket the player selected
    return (
      <div
        key={index}
        className=' mx-[0px] mb-[-40px] mt-[-90px] duration-150 ease-in-out hover:drop-shadow-[0_9px_9px_rgba(255,255,255,0.05)] md:mx-[0px] md:mb-[-110px] md:mt-[-240px] hover:md:mb-[-100px] hover:md:scale-[1.05]'
      >
        <Ticket ticket={ticket} removeHead toggleSelectedTickets={props.toggleSelectedTickets} />
      </div>
    );
  };

  const onPurchasePressed = (): void => {
    purchase(props.selectedTickets, props.resetTicketsSelected);
  };

  return (
    <div className='layout mx-10 flex items-center justify-between md:mx-4'>
      <div className='flex w-full flex-col items-start justify-start '>
        <div className='flex w-full items-center '>
          <p className='text-center text-lg font-bold text-moonbeam-cyan md:text-3xl'>Selected Tickets</p>
        </div>
        <p className='text-ms text-center text-moonbeam-cyan opacity-80 md:text-lg'>
          Select up to {maxTicketPerTx} tickets per transaction.
        </p>
        <div className='flex w-full flex-col items-center justify-start  p-2 md:py-2 '>
          <div className='flex w-full items-center justify-between overflow-hidden overflow-x-scroll py-6 md:h-[255px] md:py-12	'>
            {props.selectedTickets.map(renderMiniatureSelectedTicket)}
          </div>
          <Button
            isLoading={isTransactionPending}
            className='relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-md p-0.5  text-sm font-medium text-white '
            onClick={onPurchasePressed}
          >
            {isTransactionPending ? (
              <span className='py-2.5 pl-2 text-lg font-extrabold uppercase text-white'>
                {transactionStatus === 'PendingSignature' ? 'Pending Signature' : transactionStatus}...
              </span>
            ) : (
              <span className='relative flex w-full items-center justify-center py-2.5 text-lg font-extrabold uppercase md:px-5'>
                <p className=''>
                  Buy {nonDefaultTicketsSelected.length} Tickets for{' '}
                  {utils.formatEther(raffleState.ticketPrice.mul(nonDefaultTicketsSelected.length))}{' '}
                  {getCurrenNetworkCurrencySymbol()}{' '}
                </p>
                <div className='scale-[1.5] pl-2'>
                  <MoonbeamIcon />
                </div>
              </span>
            )}
          </Button>
          <DevTokenLink />
        </div>
      </div>
    </div>
  );
};

export default TicketsSelected;
