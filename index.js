"use strict"

const app = require('./app.js')

const config = require('./config')

app.listen(config.port, () =>{
    console.log(`Esta API se escucha en el puesto ${config.port}`);
})

