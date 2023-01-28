import React from 'react';

interface TablePaginationButtonPropsType {
  pageNumber: number;
  isCurrentPageNumber: boolean;
  setCurrentPageNumber: (currentPageNumber: number) => void;
}
const TablePaginationButton = (props: TablePaginationButtonPropsType) => {
  const { pageNumber, isCurrentPageNumber, setCurrentPageNumber } = props;

  return (
    <div
      onClick={() => setCurrentPageNumber(pageNumber)}
      className={`mx-1 rounded-md text-xs md:text-base ${
        isCurrentPageNumber ? 'bg-moonbeam-grey-light' : 'cursor-pointer text-white/60'
      } px-3 py-1.5 hover:bg-moonbeam-grey-light`}
    >
      {pageNumber}
    </div>
  );
};

export default TablePaginationButton;
