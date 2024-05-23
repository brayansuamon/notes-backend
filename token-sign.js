const { config } = require('./config/config');

const jwt = require('jsonwebtoken');

const secret = config.jwtSecret;

// Important NOT SAVE INFORMATION as EMAIL and PASSWORD in the payload
// You can see this in the debugger of jwt.io
const payload = {
  sub: 1,
  //To allow permissions
  // scope: 'admin',
  role: 'customer',
};

const signToken = (payload, secret) => {
  return jwt.sign(payload, secret);
};

const token = signToken(payload, secret);
console.log(token);
