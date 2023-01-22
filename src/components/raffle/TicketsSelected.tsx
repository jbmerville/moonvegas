import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfig } from '@usedapp/core';
import { utils } from 'ethers';
import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';

import useRaffle from '@/hooks/useRaffle';

import Loading from '@/components/icons/Loading';
import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import UnderlineLink from '@/components/links/UnderlineLink';
import Ticket from '@/components/raffle/Ticket';

import { TicketType } from '@/types';

interface TicketsSelectedPropsType {
  selectedTickets: TicketType[];
  toggleSelectedTickets: (ticket: TicketType) => void;
  resetTicketsSelected: () => void;
}

const TicketsSelected = (props: TicketsSelectedPropsType) => {
  const { networks } = useConfig();
  const { ticketPrice, purchase, isTransactionPending } = useRaffle();

  const renderMiniatureSelectedTicket = (ticket: TicketType): ReactNode => {
    // Render black shade ticket instead of the one selected by the player.
    if (!ticket.isSelected) {
      return (
        <div className='mx-[-30px] mb-[-40px] mt-[-90px] scale-[0.5] md:mx-[0px] md:mb-[-110px] md:mt-[-215px] md:scale-[0.85] '>
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
      <div className='mx-[-30px] mb-[-40px] mt-[-90px] scale-[0.5] duration-150 ease-in-out hover:drop-shadow-[0_9px_9px_rgba(255,255,255,0.05)] md:mx-[0px] md:mb-[-110px] md:mt-[-215px] md:scale-[0.85] hover:md:mb-[-100px] hover:md:scale-[0.86]'>
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
    if (props.selectedTickets.length === 0) {
      toast.warn(`No tickets selected`, {});
    } else {
      purchase(props.selectedTickets, props.resetTicketsSelected);
    }
  };

  return (
    <div className='layout mx-10 flex items-center justify-between md:mx-4'>
      <div className='flex w-full flex-col items-start justify-start '>
        <div className='mb-1 flex w-full items-center md:mb-3'>
          <FontAwesomeIcon
            icon={faReceipt}
            size='xs'
            className='mr-2 w-3 text-xs text-moonbeam-cyan md:mr-2 md:w-6'
          />
          <p className=' text-center text-lg uppercase text-moonbeam-cyan md:text-xl'>
            Selected Tickets
          </p>
        </div>
        <div className='flex w-full min-w-[915px] flex-col items-center justify-start  rounded-lg border border-moonbeam-cyan bg-moonbeam-blue-dark p-2 md:p-5 '>
          <div className='p10 flex h-[220px] w-full  items-center justify-around overflow-hidden overflow-x-scroll pl-5	'>
            {props.selectedTickets.map(renderMiniatureSelectedTicket)}
          </div>
          <button
            disabled={isTransactionPending}
            className=' group  relative mt-8 inline-flex w-full  items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#5258bd] to-[#6d388a] p-0.5 text-sm font-medium text-white hover:text-white focus:from-purple-600 focus:to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
            onClick={onPurchasePressed}
          >
            {isTransactionPending ? (
              <div role='status'>
                <Loading />
                <span className='sr-only text-white'>Loading...</span>
              </div>
            ) : (
              <span className='relative flex w-full items-center justify-center rounded bg-dark px-5 py-2.5 text-lg font-extrabold uppercase	transition-all duration-75 ease-in group-hover:bg-opacity-0 group-focus:bg-opacity-0 dark:bg-gray-900'>
                <p className='ml-2 '>
                  Buy {props.selectedTickets.length} Tickets for{' '}
                  {utils.formatEther(ticketPrice.mul(props.selectedTickets.length))}{' '}
                  {renderCurrencySymbol()}{' '}
                </p>
                <div className='mb-[-3px] ml-2 text-lg'>
                  <MoonbeamIcon />
                </div>
              </span>
            )}
          </button>
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
