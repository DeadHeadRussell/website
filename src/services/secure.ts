import {NextApiRequest} from 'next';

const token = process.env.SECURE_TOKEN;
if (!token) {
  throw new Error('No token (SECURE_TOKEN=...) provided!');
}

export function isSecure(req: NextApiRequest) {
  return token && req.query && req.query.token === token;
}

