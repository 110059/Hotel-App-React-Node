/* 
* getHotels.js - API to get avialable hotel lists
* method: GET
*/
let fs = require('fs');

module.exports = function getHotels(req, res, next) {
    fs.readFile('files/hotels.json', 'utf8', function (err, data) {
        res.header("Content-Type",'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        if (err) {
            res.json(err);
        }        
        const json  = JSON.parse(data).data.results;
        res.json(json);
    });
}