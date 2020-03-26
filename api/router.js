'use strict'

const router = require('express').Router();




//Catch for if a route doesn't exist
router.use('/', (req, res, next) => {
  return res.status(404).send({ error: `Endpoint doesn't exist.`, message: `please check /api-docs to learn how to use this api.` });
});


module.exports = router;