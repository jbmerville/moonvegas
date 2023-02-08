export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';
export const isLocal = !isProd && !isDev;

export const showLogger = isLocal ? true : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

// Raffle
export const MAX_RAFFLE_TICKET_PER_TX = 5;
export const MAX_RAFFLE_TICKET_PER_TX_MOBILE = 3;

// Table pagination
export const PAGINATION_BUTTON_COUNT = 10;
export const PAGINATION_BUTTON_COUNT_MOBILE = 5;
