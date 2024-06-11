const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};
const JwtStrategy = new Strategy(options, (payload, done) =>
  //This allow to have the info of the user available in req.user
  done(null, payload),
);

module.exports = JwtStrategy;
