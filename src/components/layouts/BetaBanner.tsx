import React from 'react';

import Button from '@/components/buttons/Button';

const FEEDBACK_FORM_URL = 'https://tally.so/r/mZ9kko';

const BetaBanner = () => {
  return (
    <div className='flex h-fit w-full items-center justify-center bg-[#01193c] px-4 py-2'>
      <p className='text-xs text-blue-400 md:text-sm'>
        Welcome to MoonVegas 🎉 - The website is under construction. Your feedback is highly appreciated
      </p>
      <Button
        onClick={() => window.open(FEEDBACK_FORM_URL, '_blank')}
        className='ml-2 min-w-fit py-1 px-2 text-sm md:ml-6'
      >
        Give feedback
      </Button>
    </div>
  );
};

export default BetaBanner;
