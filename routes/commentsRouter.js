const express = require('express');
const commentsService = require('../services/commentsService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  getCommentSchema,
  createCommentSchema,
  addItemSchema,
} = require('../schemas/commentSchema');

const router = express.Router();
const service = new commentsService();

router.get('/', async (req, res, next) => {
  try {
    const comment = await service.find();
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getCommentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await service.findOne(id);
      res.json(comment);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createCommentSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newComment = await service.create(body);
      res.json(newComment);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
