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
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
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
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const newData = await service.update(id, body);
      res.json(newData);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userDeleted = await service.delete(id);
      res.json(userDeleted);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
