import React from 'react';

import Choose from '@/components/coinflip/CoinSection';
import LastSalesSection from '@/components/coinflip/LastSalesSection';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

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
