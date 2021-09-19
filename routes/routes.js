"use strict"
const express = require('express');
const pjson = require('../package.json');
const api = express.Router();

const { parse, stringify } = require("roman-numerals")


api.get('/', (req, res) =>{
    res.send({
        "name": `${pjson.name}`,
        "version": `${pjson.version}`
      })
});

api.post('/', (req, res) => {

  try {
      const { text } = req.body;
      
      if (text === "") return res.status(400).send('Request not valid');

      if(isNaN(parseInt(text))){
        return res.send({
          "response_type": "in_channel",
          "text": parse(text)
        })
    }

    return res.send({
      "response_type": "in_channel",
      "text": `${stringify(parseInt(text))}`
})
    
  } catch (error) {
    return res.send(JSON.stringify(error.message))
  }

  }
);

module.exports = api;


console.log(parseInt('4'));