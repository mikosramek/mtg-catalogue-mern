'use strict'

const router = require('express').Router();

const keys = require('./routes/keys');
const cards = require('./routes/cards');

router.use('/', keys);
router.use('/:api_key/cards', cards);

//Catch for if a route doesn't exist
router.use('/', (req, res, next) => {
  return res.status(404).send({ error: `Endpoint doesn't exist.` });
});


module.exports = router;