import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfig } from '@usedapp/core';
import { utils } from 'ethers';
import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';

import useRaffle from '@/hooks/useRaffle';

import Button from '@/components/buttons/Button';
import Loading from '@/components/icons/Loading';
import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import UnderlineLink from '@/components/links/UnderlineLink';

import Ticket from '@/pages/raffle/components/Ticket';

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
    return (
      <div className='mx-[-30px] mb-[-40px] mt-[-90px] scale-75 drop-shadow-3xl md:mx-[-50px] md:mb-[-110px] md:mt-[-180px] md:scale-50	'>
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
        <div className='flex w-full flex-col items-center justify-start  rounded-lg border border-moonbeam-cyan bg-moonbeam-blue-dark p-2 md:p-5 '>
          <div className='flex w-full items-center justify-start overflow-x-scroll pl-5'>
            {props.selectedTickets.map(renderMiniatureSelectedTicket)}
          </div>
          <Button
            variant='outline'
            disabled={isTransactionPending}
            className='mb-3 mt-5 flex min-w-[200px] items-center justify-center bg-moonbeam-cyan/20 hover:bg-moonbeam-cyan/40 md:mt-10'
            onClick={onPurchasePressed}
          >
            {isTransactionPending ? (
              <div role='status'>
                <Loading />
                <span className='sr-only text-white'>Loading...</span>
              </div>
            ) : (
              <>
                <p className='ml-2 '>
                  Buy {props.selectedTickets.length} Tickets for{' '}
                  {utils.formatEther(ticketPrice.mul(props.selectedTickets.length))}{' '}
                  {renderCurrencySymbol()}{' '}
                </p>
                <div className='mb-[-3px] ml-2 text-lg'>
                  <MoonbeamIcon />
                </div>
              </>
            )}
          </Button>
          <p className='text-xs text-white '>
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
