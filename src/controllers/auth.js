const base64 = require('base-64');
require('dotenv').config();

function _decodeCredentials(header) {
  const encode = header.trim().replace(/Basic\s+/i, '');
  const decode = base64.decode(encode);
  return decode.split(':');
}

function auth(req, res, next) {
  const [username, password] = _decodeCredentials(
    req.headers.authorization || ''
  );
  if (process.env.AUTH_USERNAME == undefined && process.env.AUTH_PASSWORD == undefined) {
    return next();
  } else {
    if (
      username === process.env.AUTH_USERNAME &&
      password === process.env.AUTH_PASSWORD
    ) {
      return next();
    }
    res.set('WWW-Authenticate', 'Basic realm="user_pages"');
    res.status(401).send('Authentication required!');
  }
}

module.exports = {
  auth,
};
