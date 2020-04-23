const token = process.env.SECURE_TOKEN;
if (!token) {
  console.error('No token provided!');
}

export function isSecure(req) {
  return token && req.query && req.query.token === token;
}

