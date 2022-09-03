import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import LastSalesSection from '@/components/ticket/LastSalesSection';
import TicketSection from '@/components/ticket/TicketSection';

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

const tickets = generateDummyTickets(100);

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Home' />
      <main>
        <section className=' h-full bg-dark'>
          <TicketSection tickets={tickets} />
        </section>
        <LastSalesSection />
      </main>
    </Layout>
  );
}

export function generateDummyTickets(count: number): TicketType[] {
  const tickets: TicketType[] = [];
  for (let i = 0; i < count; i++) {
    tickets.push({
      id: i + 1,
      isSelected: false,
      sold: Math.random() > 0.3 ? undefined : `0x2C1a07a4cCEeeDBbb2f8134867cbDe7cC812652D`,
    });
  }
  return tickets;
}
