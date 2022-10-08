import * as React from 'react';

import Footer from '@/components/layout/Footer';
import LastSalesSection from '@/components/raffle/LastSalesSection';
import TicketSelectionSection from '@/components/raffle/TicketSelectionSection';
import Seo from '@/components/Seo';

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
    <>
      <Seo templateTitle='Raffle' />
      <main className='h-fit w-full  bg-dark'>
        <section className='h-fit pt-20'>
          <TicketSelectionSection />
          <LastSalesSection />
          <Footer />
        </section>
      </main>
    </>
  );
}
