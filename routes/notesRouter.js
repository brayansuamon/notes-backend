const express = require('express');

const router = express.Router();

//This if  for notes, the complete path is inside index
router.get('/', (req, res) => {
  res.json([
    {
      name: 'Note 1',
      description: 'Hello',
      date: '20/05/2023',
      state: 'pending',
    },
    {
      name: 'Note 2',
      description: 'Hello',
      date: '13/10/2023',
      state: 'completed',
    },
  ]);
});

router.get('/:noteId', (req, res) => {
  // const id = req.params.noteId;
  //Only get the id of the params
  const { noteId } = req.params;
  res.json({
    noteId,
    name: 'Note 1',
    description: 'Hello',
    date: '20/05/2023',
    state: 'pending',
  });
});

router.post('/', (req, res) => {
  //I want to receive all fields of the body
  const body = req.body;
  res.json({
    message: 'created note',
    data: body,
  });
});

//Allow us to update partial field of the note
router.patch('/:noteId', (req, res) => {
  const { noteId } = req.params;
  const body = req.body;
  res.json({
    message: 'update note',
    data: body,
    noteId,
  });
});

//Allow us to remove a note
router.delete('/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.json({
    message: 'deleted',
    noteId,
  });
});

module.exports = router;
