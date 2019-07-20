var express = require('express');
var fs = require('fs');
var router = express.Router();
const mysql = require('mysql')

var initialData = fs.readFileSync('perfect_party.sql').toString();

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'cs348',
	multipleStatements: true
})

connection.connect(function(err) {
	(err)? console.log(err): console.log(connection);
	connection.query(initialData, function(err, result) {
        (err)? console.log('error loading initial data: ', err): console.log(result);
  });
})

router.get('/', function(req, res, next) {
    connection.query("INSERT INTO client VALUES (4, 'test', 'ZHANG', '11111')", function(err, data) {
        (err)?res.send(err):res.json({clients: data})
    })
});

router.get('/clients', function(req, res, next) {
    connection.query("SELECT * FROM client", function(err, data) {
        (err)?res.send(err):res.json({clients: data})
    })
});

module.exports = router;
