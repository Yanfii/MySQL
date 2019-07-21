var express = require('express');
var fs = require('fs');
var router = express.Router();
const mysql = require('mysql')

var shouldPopulateWithInitialData = false;
var initialData = fs.readFileSync('perfect_party.sql').toString();

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'cs348',
	multipleStatements: true
})

connection.connect(function(err) {
	(err)? console.log(err): console.log(connection);
	if (shouldPopulateWithInitialData) {
		connection.query(initialData, function(err, result) {
	        (err)? console.log('error loading initial data: ', err): console.log(result);
	  });
	}
})

router.get('/', function(req, res, next) {
    connection.query("INSERT INTO client VALUES (4, 'test', 'ZHANG', '11111')", function(err, data) {
        (err)?res.send(err):res.json({clients: data})
    })
});

router.get('/clients', function(req, res, next) {
		var queryStr = "SELECT * FROM client WHERE TRUE";
		queryStr += (res.query.id) ? "AND id = ${res.query.id}" : ""
		queryStr += (res.query.first_name) ? "AND first_name = ${res.query.first_name}" : ""
		queryStr += (res.query.last_name) ? "AND last_name = ${res.query.last_name}" : ""
		queryStr += (res.query.phone_number) ? "AND phone_number = ${res.query.phone_number}" : ""

    connection.query(queryStr, function(err, data) {
        (err)?res.send(err):res.json({clients: data})
    })
});

module.exports = router;
