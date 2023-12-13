const express = require('express');
const usersService = require('../services/usersService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
} = require('../schemas/userSchema');

const router = express.Router();
const service = new usersService();

router.get('/', async (req, res, next) => {
  try {
    //Request Find
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await service.findOne(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const body = req.body;
      const newData = await service.update(userId, body);
      res.json(newData);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userDeleted = await service.delete(userId);
      res.json(userDeleted);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
