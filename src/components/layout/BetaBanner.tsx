import React from 'react';

import Button from '@/components/buttons/Button';

const FEEDBACK_FORM_URL = 'https://tally.so/r/mZ9kko';

const BetaBanner = () => {
  return (
    <div className='flex h-10 w-full items-center justify-center bg-[#01193c] py-6'>
      <p className='text-sm text-blue-400'>
        Welcome to MoonVegas 🎉 - The website is under construction. Your feedback is highly
        appreciated
      </p>
      <Button
        onClick={() => window.open(FEEDBACK_FORM_URL, '_blank')}
        className='ml-6 py-1 px-2 text-sm'
      >
        Give feedback
      </Button>
    </div>
  );
};

export default BetaBanner;
