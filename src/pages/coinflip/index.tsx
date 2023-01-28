import React from 'react';

import Footer from '@/components/layouts/Footer';
import Choose from '@/components/pages/coinflip/CoinSection';
import LastSalesSection from '@/components/pages/coinflip/LastSalesSection';
import Seo from '@/components/Seo';

export default function CoinFlip() {
  return (
    <>
      <Seo templateTitle='CoinFlip' />
      <main className='h-full w-full overflow-y-auto bg-dark'>
        <section className='h-full'>
          <Choose />
          <LastSalesSection />
          <Footer />
        </section>
      </main>
    </>
  );
}
