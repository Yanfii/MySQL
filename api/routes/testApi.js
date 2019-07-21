var express = require('express');
var router = express.Router();
const mysql = require('mysql')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'bojana',
	database: 'cs348'
})

connection.connect(function(err) {
	(err)? console.log(err): console.log(connection);
})

router.get('/', function(req, res, next) {
    connection.query("INSERT INTO client VALUES (4, 'test', 'ZHANG', '11111')", function(err, data) {
        (err)?res.send(err): res.json({clients: data})
    })
});

router.get('/clients', function(req, res, next) {
    connection.query("SELECT * FROM client", function(err, data) {
        (err)?res.send(err):res.json({clients: data})
    })
});

module.exports = router;