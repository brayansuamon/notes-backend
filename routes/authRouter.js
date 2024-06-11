const { config } = require('../config/config');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secret = config.jwtSecret;

router.post(
  '/login',
  //Not manage session for the moment
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const jwtConfig = {
        expiresIn: '7d',
      };
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, secret, jwtConfig);
      res.json({
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
