import React, { ReactNode } from 'react';

export interface InfoCardsPropsType {
  title: ReactNode | string;
  subtitle: ReactNode | string;
  className?: string;
}

const InfoCard = (props: InfoCardsPropsType) => {
  const { title, subtitle, className } = props;

  return (
    <div
      className={`flex grow flex-col items-center justify-center rounded-2xl bg-moonbeam-grey-light py-2 md:py-6 ${className}`}
    >
      <div className='flex text-base font-bold uppercase text-white md:text-3xl'>{title}</div>
      <div className='text flex text-xs text-white opacity-75 md:text-base'>{subtitle}</div>
    </div>
  );
};

export default InfoCard;
