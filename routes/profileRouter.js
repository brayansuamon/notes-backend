const express = require('express');
const passport = require('passport');
const commentsService = require('../services/commentsService');

const router = express.Router();
const service = new commentsService();

router.get(
  '/my-comments',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const comments = await service.findByUser(user.sub);
      res.json(comments);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
