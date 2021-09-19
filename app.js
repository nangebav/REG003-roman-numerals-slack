"use strict"

const express = require('express');
const api = require('./routes/routes')

const app = express();


app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use('/', api );

module.exports = app;