const express = require('express');
const usersService = require('../services/usersService');

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

router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await service.findOne(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    //Request Find
  } catch (error) {
    next(error);
  }
});

router.patch('/:userId', async (req, res, next) => {
  try {
    //Request Find
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    //Request Find
  } catch (error) {
    next(error);
  }
});

module.exports = router;
