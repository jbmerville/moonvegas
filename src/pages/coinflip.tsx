import React from 'react';

import Choose from '@/components/coinflip/CoinSection';
import LastSalesSection from '@/components/coinflip/LastSalesSection';
import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const CoinFlip = () => {
  return (
    <Layout>
      <Seo templateTitle='CoinFlip' />
      <main className='h-full w-full overflow-y-auto bg-dark'>
        <section className='h-full'>
          <Choose />
          <LastSalesSection />
          <Footer />
        </section>
      </main>
    </Layout>
  );
};

export default CoinFlip;
