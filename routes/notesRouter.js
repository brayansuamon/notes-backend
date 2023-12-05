const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      name: 'Product 1',
      price: 1000,
    },
    {
      name: 'Product 2',
      price: 2000,
    },
  ]);
});

router.get('/:noteId', (req, res) => {
  // const id = req.params.noteId;
  //Only get the id of the params
  const { noteId } = req.params;
  res.json({
    noteId,
    name: 'Product 1',
    price: 1000,
  });
});

module.exports = router;
