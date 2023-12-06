const express = require('express');
const notesService = require('../services/notesService');

const router = express.Router();
const service = new notesService();

//This if  for notes, the complete path is inside index
router.get('/', async (req, res) => {
  const notes = await service.find();
  res.json(notes);
});

router.get('/:noteId', async (req, res) => {
  // const id = req.params.noteId;
  //Only get the id of the params
  const { noteId } = req.params;
  const note = await service.findOne(noteId);
  res.json(note);
});

router.post('/', async (req, res) => {
  //I want to receive all fields of the body
  const body = req.body;
  const newNote = await service.create(body);
  res.status(201).json(newNote);
});

//Allow us to update partial field of the note
router.patch('/:noteId', async (req, res) => {
  try {
    //All parameters of notes comes as string
    const { noteId } = req.params;
    const body = req.body;
    const updateNote = await service.update(noteId, body);
    res.json(updateNote);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

//Allow us to remove a note
router.delete('/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const deleteNote = await service.delete(noteId);
  res.json(deleteNote);
});

module.exports = router;
