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
  '/:noteId',
  //Middleware to validate data, use getNoteSchema to get id
  validatorHandler(getNotesSchema, 'params'),
  //Middleware to connect to the service
  async (req, res, next) => {
    try {
      // const id = req.params.noteId;
      //Only get the id of the params
      const { noteId } = req.params;
      const note = await service.findOne(noteId);
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
  '/:noteId',
  //First validate Id and then continue with the content
  validatorHandler(getNotesSchema, 'params'),
  validatorHandler(updateNotesSchema, 'body'),
  async (req, res, next) => {
    try {
      //All parameters of notes comes as string
      const { noteId } = req.params;
      const body = req.body;
      const updateNote = await service.update(noteId, body);
      res.json(updateNote);
    } catch (error) {
      next(error);
    }
  },
);

//Allow us to remove a note
router.delete('/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const deleteNote = await service.delete(noteId);
  res.json(deleteNote);
});

module.exports = router;
