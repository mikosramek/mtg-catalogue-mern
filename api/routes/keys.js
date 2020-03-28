'use strict'
const router = require('express').Router();

const keys = require('../controllers/keys');

router.use('/:api_key', (req, res, next) => {
  const { api_key } = req.params;
  if(!api_key) return res.status(403).send({error:'API key not provided'});
  keys.checkForKey(api_key)
    .then(() => {
      next();
    })
    .catch(err => {
      res.status(403).send(err);
    })
});


module.exports = router;