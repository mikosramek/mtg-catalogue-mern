'use strict'
const mysql = require('mysql');

const sqlConnectionSettings = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_ADMIN_USER,
  password: process.env.DB_ADMIN_PASS
}

const Database = {};

Database.getSingle = (query) => {
  return new Promise((res, rej) => {
    const connection = mysql.createConnection(sqlConnectionSettings);
    connection.connect((err) => {
      if(err) rej(err);
      connection.query(query, (err, data) => {
        if(err) rej(err);
        if(data && data.length === 1){
          res(data[0]);
        }else{
          rej('API key not found.');
        }
        connection.end();
      });
    })
  })
}
module.exports = Database;