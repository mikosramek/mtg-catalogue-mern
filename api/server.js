'use strict'
process.env.NODE_ENV ? null : require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./router');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);

const PORT = process.env.PORT || 3000;

new database({}, () => {
  app.listen(PORT, () => {
    console.log(`Running on: localhost:${PORT}`);
  });
})
