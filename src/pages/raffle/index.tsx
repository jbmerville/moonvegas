import * as React from 'react';

import Footer from '@/components/layout/Footer';
import LastSalesSection from '@/components/raffle/LastSalesTable';
import TicketSelectionSection from '@/components/raffle/TicketSelectionSection';
import WinnerHistoryTable from '@/components/raffle/WinnerHistoryTable';
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

export default function Raffle() {
  return (
    <>
      <Seo templateTitle='Raffle' />
      <main className='h-fit w-full'>
        <section className='h-fit pt-36 md:pt-10'>
          {/* TODO: find better solution. Currently we need to adjust pt above to account for header size */}
          <TicketSelectionSection />
          <div className='mt-10 flex min-w-full grow flex-col justify-between rounded-t-3xl bg-moonbeam-grey text-white'>
            <WinnerHistoryTable />
            <LastSalesSection />
          </div>
          <Footer />
        </section>
      </main>
    </>
  );
}
