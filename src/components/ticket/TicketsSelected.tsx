import { useConfig } from '@usedapp/core';
import { utils } from 'ethers';
import Image from 'next/image';
import React, { ReactNode } from 'react';
import { toast } from 'react-toastify';

import useRaffle from '@/hooks/useRaffle';

import Button from '@/components/buttons/Button';
import MoonbeamIcon from '@/components/icons/MoonbeamIcon';
import UnderlineLink from '@/components/links/UnderlineLink';

import moonbeam from '../../../public/images/moonbeam-token.png';

import { TicketType } from '@/types';

interface TicketsSelectedPropsType {
  selectedTickets: TicketType[];
  toggleSelectedTickets: (ticket: TicketType) => void;
  resetTicketsSelected: () => void;
}

const TicketsSelected = (props: TicketsSelectedPropsType) => {
  const { networks } = useConfig();
  const { ticketPrice, purchase, purchasing } = useRaffle();

  const renderMiniatureSelectedTicket = (ticket: TicketType): ReactNode => {
    return (
      <div
        key={ticket.id}
        onClick={() => props.toggleSelectedTickets(ticket)}
        className='z-10  mx-2 ml-[-20px] flex h-[90px] min-w-[40px] cursor-pointer flex-col rounded bg-moonbeam-cyan px-4 py-2 shadow-[0_0px_20px_-4px_rgb(0,0,0)] transition-all md:h-[150px] md:min-w-[90px]  md:shadow-[0_0px_52px_-7px_rgb(0,0,0)]'
      >
        <div className='neonTextPink rounded-full text-lg md:text-2xl'>{ticket.id}</div>
        <div className='flex grow items-center justify-center'>
          <div className='mb-3'>
            <div className='mb-8 hidden md:block'>
              <Image src={moonbeam} layout='fixed' height='50px' width='50px' alt='' />
            </div>
            <div className='block md:hidden'>
              <Image src={moonbeam} layout='fixed' height='25px' width='25px' alt='' />
            </div>
          </div>
        </div>
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
      <div className='flex w-full flex-col items-start justify-start rounded '>
        <p className='mb-1 text-xl uppercase text-moonbeam-cyan md:mb-3 md:text-xl'>
          Selected Tickets
        </p>
        <div className='flex w-full flex-col items-center justify-start  rounded border border-moonbeam-cyan p-2 md:p-5 '>
          <div className='flex w-full items-center justify-start overflow-scroll pl-5'>
            {props.selectedTickets.map(renderMiniatureSelectedTicket)}
          </div>
          <Button
            variant='outline'
            className='mb-3 mt-5 flex min-w-[200px] items-center justify-center bg-moonbeam-cyan/20 hover:bg-moonbeam-cyan/40 md:mt-10'
            onClick={onPurchasePressed}
          >
            {purchasing ? (
              <>
                <div role='status'>
                  <svg
                    className='mr-2 inline h-5 w-5 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                  <span className='sr-only text-white'>Loading...</span>
                </div>
              </>
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
