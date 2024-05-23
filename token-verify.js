const { config } = require('./config/config');

const jwt = require('jsonwebtoken');

const secret = config.jwtSecret;
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcxNjQ5OTgyMn0.WR1Oam2AaK2lO-hawW-YpycQ92xtCgHmKOGREizqhkE';

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload);
