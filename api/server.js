'use strict'
process.env.NODE_ENV ? null : require('dotenv').config();

const express = require('express');

const rateLimit = require("express-rate-limit");
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./router');

const app = express();

// limit each IP 100 requests per 15 minutes
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on: localhost:${PORT}`);
});
