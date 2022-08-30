import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Ticket from '@/components/Ticket';

import { TicketType } from '@/types';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <main>
        <section className=' h-full bg-dark'>
          <div className='flex h-full	w-full items-start justify-start overflow-scroll'>
            {renderTickets()}
          </div>
        </section>
      </main>
    </Layout>
  );
}

function renderTickets() {
  const tickets = generateDummyTickets(100);
  return tickets.map((ticket) => <Ticket ticket={ticket} key={ticket.id} />);
}

function generateDummyTickets(count: number): TicketType[] {
  const tickets: TicketType[] = [];
  for (let i = 0; i < count; i++) {
    tickets.push({
      id: i + 1,
      sold: Math.random() > 0.3 ? undefined : `0x00${i + 1}`,
    });
  }
  return tickets;
}
