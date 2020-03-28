'use strict'

const keysDB = require('../databases/keys');

const controller = {};

controller.checkForKey = (key) => {
  return new Promise((res, rej) => {
    const query = `SELECT api_key FROM api_keys WHERE api_key='${key}'`;
    keysDB.getSingle(query)
      .then(res)
      .catch(rej);
  })
}

module.exports = controller;