'use strict'

const database = require('../databases/cards');

const controller = {};

controller.addCard = ( name, image_url, color_identity, cmc, type, owned, used, oracle ) => {
  return new Promise((res, rej) => {
    const query = `INSERT INTO cards (name, image_url, color_identity, cmc, type, owned, used, oracle) VALUES ("${name}", "${image_url}", "${color_identity}", ${cmc}, "${type}", ${owned}, ${used}, "${oracle}")`;
    database.queryForAction(query)
      .then(() => res())
      .catch(e => rej(e));
  });
}
controller.updateCard = (id, owned, used) => {
  return new Promise((res, rej) => {
    const query = `UPDATE cards SET owned=${owned}, used=${used} WHERE id=${id};`;
    database.queryForAction(query)
      .then(() => res())
      .catch(e => rej(e));
  });
}
controller.removeCard = (id) => {
  return new Promise((res, rej) => {
    const query = `DELETE FROM cards WHERE id=${id};`;
    database.queryForAction(query)
      .then(() => res())
      .catch(e => rej(e));
  });
}
controller.getCards = (name, type, color_identity, cmc, available, oracle, limit, offset) => {
  return new Promise((res, rej) => {
    let query = `SELECT * FROM cards WHERE (`;

    let connector = ''

    if(name) {
      query += connector + `name ${name.slice(0,1) === 'e' ? '=' : 'LIKE'} "${name.slice(1, name.length)}"`;
      connector = ' AND ';
    }
    if(type) {
      query += connector + `type ${type.slice(0,1) === 'e' ? '=' : 'LIKE'} "${type.slice(1, type.length)}"`;
      connector = ' AND ';
    }
    if(color_identity) {
      query += connector + `color_identity="${color_identity}"`;
      connector = ' AND ';
    }
    if(cmc) {
      query += connector + `cmc=${cmc}`;
      connector = ' AND ';
    }
    if(available) {
      query += connector + `(owned - used > ${available})`;
      connector = ' AND ';
    }
    if(oracle) {
      query += connector + `oracle LIKE "${oracle}"`;
    }

    query += `) LIMIT ${limit ? limit : 24} OFFSET ${offset ? offset * limit : 0}`;

    console.log(query);
    
    database.queryForResults(query)
      .then((data) => res(data))
      .catch(e => rej(e));
  });
}

module.exports = controller;