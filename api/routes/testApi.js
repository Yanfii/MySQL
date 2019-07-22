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
        (err)?res.send(err): res.json({clients: data})
    })
});

router.get('/clients', function(req, res, next) {
		var queryStr = 'SELECT * FROM client WHERE TRUE';
		queryStr += (req.query.id) ? 'AND id = ? ${req.query.id}' : ''
		var queryPlaceholders = [];
		if (req.query.first_name) {
			queryStr += ' AND first_name = ?' : '';
			queryPlaceholders.append(req.query.first_name);
		}
		if (req.query.last_name) {
			queryStr = 'AND last_name = ?';
			queryPlaceholders.append(req.query.last_name);
		}
		if (req.query.phone_number) {
			queryStr = 'AND phone_number = ?';
			queryPlaceholders.append(req.query.phone_number);
		}
    connection.query(queryStr, queryPlaceholders, function(err, data) {
        (err)?res.send(err):res.json({clients: data})
    })
});

// Get events and cost per each event for a given user
router.get('/clients/:user_id', function(req, res, next) {
		var user_id = req.params.user_id;
		const queryStr = 'SELECT event_id,`date`,LOCATION,title,SUM(cost_per_unit*units)FROM`Event` NATURAL JOIN Vendor_Item NATURAL JOIN`Transaction` WHERE user_id=${user_id} GROUP BY event_id,date,LOCATION,title'
    connection.query(queryStr, function(err, data) {
        (err)?res.send(err):res.json({clients: data})
    })
});

module.exports = router;
