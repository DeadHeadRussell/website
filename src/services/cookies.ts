export const cookiesKey: string = process.env.COOKIES_KEY || '';
if (!cookiesKey) {
  throw new Error('No cookies key (COOKIES_KEY=...) provided!');
}

export const COOKIE_LISTENER_ID = 'listener-id';

