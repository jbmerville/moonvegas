import React from 'react';

import Footer from '@/components/layout/Footer';
import Seo from '@/components/Seo';

import Choose from '@/pages/coinflip/coinflip/CoinSection';
import LastSalesSection from '@/pages/coinflip/coinflip/LastSalesSection';

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
