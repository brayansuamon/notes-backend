const express = require('express');
const notesService = require('../services/notesService');
const validatorHandler = require('../middlewares/validatorHandler');
const {
  getNotesSchema,
  createNotesSchema,
  updateNotesSchema,
} = require('../schemas/noteSchema');

const router = express.Router();
const service = new notesService();

//This if  for notes, the complete path is inside index
router.get('/', async (req, res, next) => {
  try {
    const notes = await service.find();
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  //Middleware to validate data, use getNoteSchema to get id
  validatorHandler(getNotesSchema, 'params'),
  //Middleware to connect to the service
  async (req, res, next) => {
    try {
      // const id = req.params.id;
      //Only get the id of the params
      const { id } = req.params;
      const note = await service.findOne(id);
      res.json(note);
    } catch (error) {
      //To catch the middleware error
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createNotesSchema, 'body'),
  async (req, res) => {
    //I want to receive all fields of the body
    const body = req.body;
    const newNote = await service.create(body);
    res.status(201).json(newNote);
  },
);

//Allow us to update partial field of the note
router.patch(
  '/:id',
  //First validate Id and then continue with the content
  validatorHandler(getNotesSchema, 'params'),
  validatorHandler(updateNotesSchema, 'body'),
  async (req, res, next) => {
    try {
      //All parameters of notes comes as string
      const { id } = req.params;
      const body = req.body;
      const updateNote = await service.update(id, body);
      res.json(updateNote);
    } catch (error) {
      next(error);
    }
  },
);

//Allow us to remove a note
router.delete(
  '/:id',
  validatorHandler(getNotesSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const deleteNote = await service.delete(id);
    res.json(deleteNote);
  },
);

module.exports = router;
