const client = require('../config/database')
const jwt = require("jsonwebtoken");
// var jwtDecode = require('jwt-decode');
const TagsController = () => { };

TagsController.getall = (res) => {
    client.query('select * from tags', (err, results) => {
        if (err) console.log(err);
        else {
            console.log(results.rows);
            res.send({ success: true, data: results.rows })
        }
    })
}
TagsController.search = (params, res) => {
    client.query(`select * from tags where name like '%${params}%'`, (err, results) => {
        if (err) console.log(err);
        else {
            console.log(results.rows);
            res.send({ success: true, data: results.rows })
        }
    })
}

module.exports = TagsController;