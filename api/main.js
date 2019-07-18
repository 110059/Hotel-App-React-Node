/* 
* main.js - entry file
*/
const express = require('express');
const app = express();
var config = require('./config/config')[process.NODE_ENV];

/*
* setup middleware
*/
app.use(express.static('files'));


/**
 * get hotels list
 * method: GET
 */
app.get('/hotels', require('./lib/getHotels'))

/**
 * node server start here
 */
app.listen(config.port, function(re, res) {
    console.log('app running at port ' + config.port);
})
