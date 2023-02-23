import React from 'react';

import Button from '@/components/buttons/Button';

import { useCurrentNetworkContext } from '@/contexts/CurrentNetwork';

interface EmptyCoinFlipFormPropsType {
  setValue: (value: number) => void;
}
const EmptyCoinFlipForm = (props: EmptyCoinFlipFormPropsType) => {
  const { setValue } = props;
  const { currentNetwork, colorAccent, colorAccentText } = useCurrentNetworkContext();

  return (
    <div className='flex h-full w-full flex-col'>
      <div className='h-full w-full'>
        <input
          onChange={(event: any) => setValue(parseFloat(event.target.value) || 0)}
          type='number'
          id='first_name'
          className={`block w-full rounded-lg border-2 border-${colorAccent} focus:ring-white-500 bg-moonbeam-grey-dark pl-4 text-white md:p-2.5  md:text-xl`}
          placeholder={`0 ${currentNetwork.currencySymbol}`}
          min='1'
          required
        />
      </div>
      <div className='mt-4 flex w-full'>
        <Button className='flex w-full justify-center'>
          <div className={`uppercase md:text-xl text-${colorAccentText}`}>Add</div>
        </Button>
        <Button className='ml-4 flex w-full justify-center'>
          <div className={`uppercase md:text-xl text-${colorAccentText}`}>Remove</div>
        </Button>
      </div>
    </div>
  );
};

export default EmptyCoinFlipForm;
