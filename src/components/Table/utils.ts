import { TableRowType } from '@/components/Table/TableRow';

import { PAGINATION_BUTTON_COUNT, PAGINATION_BUTTON_COUNT_MOBILE } from '@/constants/env';

type PageRowsMapType = Map<number, TableRowType<any>[]>;

export const putPageRowsMap = (pageRowsMap: PageRowsMapType, key: number, value: TableRowType<any>) => {
  if (pageRowsMap.get(key) !== undefined) {
    pageRowsMap.get(key)?.push(value);
  } else {
    pageRowsMap.set(key, [value]);
  }
};

export const getPagesAroundPage = (pageRowsMap: PageRowsMapType, pageNumber: number, isMobile: boolean): number[] => {
  const pageRowsMapKeys = Array.from(pageRowsMap.keys());
  const paginationButtonCount = isMobile ? PAGINATION_BUTTON_COUNT_MOBILE : PAGINATION_BUTTON_COUNT;
  const halfPaginationButtonCount = ~~(paginationButtonCount / 2);
  const isHalfPaginationButtonCountEven = halfPaginationButtonCount % 2 === 0;
  const lowerBound = Math.max(pageNumber - halfPaginationButtonCount - (isHalfPaginationButtonCountEven ? 1 : 0), 0);
  const upperBound = Math.min(pageNumber + halfPaginationButtonCount, pageRowsMapKeys.length);

  return pageRowsMapKeys.slice(lowerBound, upperBound);
};
