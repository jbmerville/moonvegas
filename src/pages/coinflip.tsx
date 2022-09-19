import React from 'react';

import Choose from '@/components/coinflip/CoinSection';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import LastSalesSection from '@/components/ticket/LastSalesSection';

const CoinFlip = () => {
  return (
    <Layout>
      <Seo templateTitle='CoinFlip' />
      <main>
        <section className=' h-full bg-dark'>
          <Choose />
        </section>
        <LastSalesSection />
      </main>
    </Layout>
  );
};

export default CoinFlip;
