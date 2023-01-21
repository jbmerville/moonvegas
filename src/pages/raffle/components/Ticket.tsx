import Image from 'next/image';
import React from 'react';

import ticketBody from '../../../../public/images/ticket-body.png';
import ticketHead from '../../../../public/images/ticket-head.png';

import { TicketType } from '@/types';

interface TicketPropsType {
  ticket: TicketType;
  toggleSelectedTickets: (ticket: TicketType) => void;
  removeHead?: boolean;
  displayShimmer?: boolean;
}
const Ticket = (props: TicketPropsType) => {
  // const [isOwner, setIsOwner] = useState(false);
  // const { account } = useEthers();

  // useEffect(() => {
  //   setIsOwner(props.ticket.owner !== undefined);
  // }, [props.ticket.owner]);

  const renderTicketHead = () => {
    return (
      <div className='absolute flex h-[210px] min-w-[100px] drop-shadow-[0_9px_3px_rgba(255,255,255,0.10)] md:h-[400px] md:min-w-[170px]'>
        <div className='absolute left-[20px] top-[35px] z-10 font-secondary text-xs text-white md:top-[90px] md:left-[50px]'>
          No. :{String(props.ticket.id).padStart(6, '0')}
        </div>
        <Image src={ticketHead} layout='fill' objectFit='contain' alt='' />
      </div>
    );
  };

  const renderTicketBody = () => {
    return (
      <div
        className={`absolute flex h-[210px] min-w-[100px] transition-all duration-150 md:min-w-[170px] ${
          props.ticket.isSelected || props.removeHead ? 'mt-4 md:mt-8' : 'md:hover:mt-8'
        } ${
          props.displayShimmer
            ? 'opacity-20 brightness-0'
            : 'cursor-pointer drop-shadow-[0_9px_3px_rgba(255,255,255,0.10)]'
        } " md:h-[400px]`}
      >
        <div className='absolute left-[25px] top-[130px] z-10 rotate-270 font-secondary text-sm text-white md:top-[240px] md:left-[50px] md:text-xl'>
          No. :{String(props.ticket.id).padStart(6, '0')}
        </div>
        <Image src={ticketBody} layout='fill' objectFit='contain' alt='' />
      </div>
    );
  };

  if (props.ticket.owner) {
    return (
      <div className='relative flex h-[210px] min-w-[100px] md:h-[450px] md:min-w-[170px]'>
        {renderTicketHead()}
      </div>
    );
  }

  // Ticket is not owned
  return (
    <div
      onClick={() => !props.displayShimmer && props.toggleSelectedTickets(props.ticket)}
      className='relative flex h-[240px] min-w-[100px] md:h-[450px] md:min-w-[170px]'
    >
      {!props.removeHead && renderTicketHead()}
      {renderTicketBody()}
    </div>
  );
};

export default Ticket;
