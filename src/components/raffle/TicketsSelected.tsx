import { useConfig } from '@usedapp/core';
import { utils } from 'ethers';
import React, { ReactNode, useContext } from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import Button from '@/components/buttons/Button';
import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import UnderlineLink from '@/components/links/UnderlineLink';
import { getMaxTicketPerTx, getNonDefaultTicketsSelected } from '@/components/raffle/helper';
import Ticket from '@/components/raffle/Ticket';

import RaffleContext from '@/contexts/RaffleContext';

import { TicketType } from '@/types';

interface TicketsSelectedPropsType {
  selectedTickets: TicketType[];
  toggleSelectedTickets: (ticket: TicketType) => void;
  resetTicketsSelected: () => void;
}

const TicketsSelected = (props: TicketsSelectedPropsType) => {
  const { networks } = useConfig();
  const { raffleState, purchase, isTransactionPending } = useContext(RaffleContext);
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

  const renderCurrencySymbol = (): string => {
    if (networks && networks.length > 0) {
      return networks[0].nativeCurrency?.symbol || 'DEV';
    }
    return 'ERROR';
  };

  const onPurchasePressed = (): void => {
    purchase(props.selectedTickets, props.resetTicketsSelected);
  };

  return (
    <div className='layout mx-10 flex items-center justify-between md:mx-4'>
      <div className='flex w-full flex-col items-start justify-start '>
        <div className='flex w-full items-center '>
          {/* <FontAwesomeIcon
            icon={faReceipt}
            size='xs'
            className='mr-2 w-3 text-xs text-moonbeam-cyan md:mr-2 md:w-6'
          /> */}
          <p className='text-center text-lg font-bold text-moonbeam-cyan md:text-3xl'>Selected Tickets</p>
        </div>
        <p className='text-center text-xs text-moonbeam-cyan opacity-80 md:text-lg'>
          Select up to {maxTicketPerTx} tickets per transaction.
        </p>
        <div className='flex w-full flex-col items-center justify-start  p-2 md:py-2 '>
          <div className='flex w-full items-center justify-between overflow-hidden overflow-x-scroll py-12 pl-5 md:h-[255px]	'>
            {props.selectedTickets.map(renderMiniatureSelectedTicket)}
          </div>
          <Button
            isLoading={isTransactionPending}
            className='relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-md p-0.5  text-sm font-medium text-white '
            onClick={onPurchasePressed}
          >
            {isTransactionPending ? (
              <span className='py-2.5 text-lg font-extrabold uppercase text-white'>Pending...</span>
            ) : (
              <span className='relative flex w-full items-center justify-center px-5 py-2.5 text-lg font-extrabold uppercase'>
                <p className='ml-2 '>
                  Buy {nonDefaultTicketsSelected.length} Tickets for{' '}
                  {utils.formatEther(raffleState.ticketPrice.mul(nonDefaultTicketsSelected.length))}{' '}
                  {renderCurrencySymbol()}{' '}
                </p>
                <div className='scale-[1.5] pl-2'>
                  <MoonbeamIcon />
                </div>
              </span>
            )}
          </Button>
          <p className='mt-2 text-xs text-white '>
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

export default TicketsSelected;
