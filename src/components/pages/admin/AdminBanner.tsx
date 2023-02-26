import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { shortenAddress } from '@usedapp/core';
import React from 'react';

import useIsMobile from '@/hooks/useIsMobile';

import { smartCountractAdminAddresses } from '@/config';

interface AdminBannerPropsType {
  owner: string;
  address: string;
}

const AdminBanner = (props: AdminBannerPropsType) => {
  const { owner, address } = props;
  const isMobile = useIsMobile();

  const renderAddress = (value: string): string => {
    try {
      return isMobile ? shortenAddress(value) : value;
    } catch {
      return '';
    }
  };

  return (
    <div
      className='mb-4  inline-block w-full rounded-lg bg-moonbeam-grey p-4 text-xs text-moonbase-alpha-accent md:text-sm'
      role='alert'
    >
      <FontAwesomeIcon icon={faInfoCircle} size='sm' className='mr-2 mt-1 inline w-[13px] text-moonbase-alpha-accent' />

      <span className='font-medium'>
        This contract address is {renderAddress(address)} and is owned by {renderAddress(owner)}.
      </span>
      <p>
        <span className='font-medium'>
          The following addresses are considered admins (are allowed to execute function bellow):
        </span>
        <ul className='mt-1.5 ml-4 list-inside list-disc  '>
          {smartCountractAdminAddresses.map((adminAddress) => (
            <li key={adminAddress}>{renderAddress(adminAddress)}</li>
          ))}
        </ul>
      </p>
    </div>
  );
};

export default AdminBanner;
