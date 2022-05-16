import Cookies from 'cookies';
import {NextApiRequest, NextApiResponse} from 'next';
import {v4 as uuid} from 'uuid';


export const cookiesKey: string = process.env.COOKIES_KEY || '';
if (!cookiesKey) {
  throw new Error('No cookies key (COOKIES_KEY=...) provided!');
}

export const COOKIE_LISTENER_ID = 'listener-id';

export function getListenerId(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res, {keys: [cookiesKey]});
  const listenerId = cookies.get(COOKIE_LISTENER_ID, {signed: true}) || uuid();
  const cookieExpiry = new Date();
  cookieExpiry.setFullYear(cookieExpiry.getFullYear() + 10);
  cookies.set(COOKIE_LISTENER_ID, listenerId, {
    signed: true,
    expires: cookieExpiry
  });
  return listenerId;
}

