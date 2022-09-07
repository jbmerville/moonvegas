import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import LastSalesSection from '@/components/ticket/LastSalesSection';
import TicketSection from '@/components/ticket/TicketSection';

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
          <TicketSection />
        </section>
        <LastSalesSection />
      </main>
    </Layout>
  );
}
