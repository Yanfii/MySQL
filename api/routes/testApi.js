var express = require('express');
var fs = require('fs');
var router = express.Router();
const mysql = require('mysql')

var shouldPopulateWithInitialData = false;
var initialData = fs.readFileSync('perfect_party.sql').toString();

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
 	password: '123456789',
	database: 'cs348',
	multipleStatements: true,
  insecureAuth: true,
})

connection.connect(function(err) {
	(err)? console.log(err): console.log(connection);
	if (shouldPopulateWithInitialData) {
		connection.query(initialData, function(err, result) {
	        (err)? console.log('error loading initial data: ', err): console.log(result);
	  });
	}
})

// Insert a client
router.post('/test', function(req, res, next) {
    var queryPlaceholders = [];
    queryPlaceholders.push(req.body.first_name)
    queryPlaceholders.push(req.body.last_name)
    queryPlaceholders.push(req.body.phone_number)
    var query = connection.query(`INSERT INTO client (first_name, last_name, phone_number) VALUES (?, ?, ?)`, queryPlaceholders, function(err, data) {
              (err)?res.send(err): res.json({clients: data})
		  })
	console.log(query.sql)
});

// Insert an event
router.post('/insert_event', function(req, res, next) {
    var queryPlaceholders = [];
    queryPlaceholders.push(req.body.date)
    queryPlaceholders.push(req.body.location)
    queryPlaceholders.push(req.body.user_id)
	queryPlaceholders.push(req.body.title)
    var query = connection.query(`INSERT INTO event (date, location, user_id, title) VALUES (?, ?, ?, ?)`, queryPlaceholders, function(err, data) {
              (err)?res.send(err): res.json({clients: data})
		  })
	console.log(query.sql)
});

// Insert an supplier
router.post('/insert_supplier', function(req, res, next) {
    var queryPlaceholders = [];
    queryPlaceholders.push(req.body.name)
    queryPlaceholders.push(req.body.contact_info)
	queryPlaceholders.push(req.body.type)
    var query = connection.query(`INSERT INTO supplier (name, contact_info, type) VALUES (?, ?, ?, ?)`, queryPlaceholders, function(err, data) {
              (err)?res.send(err): res.json({suppliers: data})
		  })
	console.log(query.sql)
});

router.get('/clients', function(req, res, next) {
		var queryStr = 'SELECT * FROM client WHERE TRUE ';
		var queryPlaceholders = [];
		if (req.query.id) {
			queryStr += 'AND id = ?, ';
			queryPlaceholders.push(req.query.id);
		}
		if (req.query.first_name) {
			queryStr += ' AND first_name = ?, ';
			queryPlaceholders.push(req.query.first_name);
		}
		if (req.query.last_name) {
			queryStr += 'AND last_name = ?, ';
			queryPlaceholders.push(req.query.last_name);
		}
		if (req.query.phone_number) {
			queryStr += 'AND phone_number = ?';
			queryPlaceholders.push(req.query.phone_number);
		}
    var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
        (err)?res.send(err):res.json({clients: data})
	})
	console.log(query.sql)
});

router.get('/transactions', function(req, res, next) {
		var queryStr = 'SELECT * FROM transaction WHERE TRUE ';
		var queryPlaceholders = [];
		if (req.query.transaction_id) {
			queryStr += 'AND transaction_id = ?, ';
			queryPlaceholders.push(req.query.transaction_id);
		}
		if (req.query.transaction_date) {
			queryStr += ' AND transaction_date = ?, ';
			queryPlaceholders.push(req.query.transaction_date);
		}
		if (req.query.card_num) {
			queryStr += 'AND card_num = ?, ';
			queryPlaceholders.push(req.query.card_num);
		}
		if (req.query.event_id) {
			queryStr += 'AND event_id = ?';
			queryPlaceholders.push(req.query.event_id);
		}
		if (req.query.units_purchased) {
			queryStr += 'AND units_purchased = ?';
			queryPlaceholders.push(req.query.units_purchased);
		}
    var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
        (err)?res.send(err):res.json({transactions: data})
	})
	console.log(query.sql)
});

// Insert a transaction
router.post('/insert_transaction', function(req, res, next) {
    var queryPlaceholders = [];
    queryPlaceholders.push(req.body.transaction_date);
    queryPlaceholders.push(req.body.card_num);
    queryPlaceholders.push(req.body.event_id);
		queryPlaceholders.push(req.body.units_purchased);
    var query = connection.query('INSERT INTO `Transaction` (transaction_date, card_num, event_id, units_purchased) VALUES (?, ?, ?, ?)', queryPlaceholders, function(err, data) {
              (err)?res.send(err): res.json({transactions: data});
		  })
	console.log(query.sql);
});

// Get transactions for a given user by joining on event
router.get('/transactions/:user_id', function(req, res, next) {
	const queryStr = 'SELECT * From Transaction natural join Event where user_id = ?';
 	const queryPlaceholders = [req.params.user_id];
	var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
			(err)?res.send(err):res.json({transactions: data});
	})
});

// Insert a vendor item transaction link
router.post('/insert_item_for_transaction', function(req, res, next) {
    var queryPlaceholders = [];
    queryPlaceholders.push(req.body.item_id);
    queryPlaceholders.push(req.body.transaction_id);
    var query = connection.query('INSERT INTO `Transacted_Items` (item_id, transaction_id) VALUES (?, ?)', queryPlaceholders, function(err, data) {
              (err)?res.send(err): res.json({Transacted_Items: data});
		  })
	console.log(query.sql);
});

// Insert a vendor item
router.post('/insert_vendor_item', function(req, res, next) {
    var queryPlaceholders = [];
    queryPlaceholders.push(req.body.item_id);
    queryPlaceholders.push(req.body.supplier_id);
    queryPlaceholders.push(req.body.name_description);
		queryPlaceholders.push(req.body.cost_per_unit);
		queryPlaceholders.push(req.body.rating);
    var query = connection.query('INSERT INTO `Vendor_Item` (item_id, supplier_id, name_description, cost_per_unit, rating) VALUES (?, ?, ?, ?, ?)', queryPlaceholders, function(err, data) {
              (err)?res.send(err): res.json({vendor_items: data});
		  })
	console.log(query.sql);
});


// Get transactions for a given user by joining on event
router.get('/decor/:event_id', function(req, res, next) {
	const queryStr = 'SELECT transaction_date, v.item_id, name_description, units_purchased, cost_per_unit, rating, transport_details, decor_type FROM`Transaction` AS t JOIN Transacted_Items AS dict ON t.transaction_id=dict.item_id JOIN Vendor_Item AS v ON dict.item_id=v.item_id JOIN Decor AS d ON d.item_id=dict.item_id WHERE t.event_id=?;';
	const queryPlaceholders = [req.params.event_id];
	var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
			(err)?res.send(err):res.json({decor_items: data});
		})
});

router.get('/menu/:event_id', function(req, res, next) {
	const queryStr = 'SELECT transaction_date,v.item_id,name_description,units_purchased,cost_per_unit,rating,food_care_instruction,dietary_restriction FROM`Transaction` AS t JOIN Transacted_Items AS dict ON t.transaction_id=dict.item_id JOIN Vendor_Item AS v ON dict.item_id=v.item_id JOIN Menu_Item AS m ON m.item_id=dict.item_id WHERE t.event_id=?;';
	const queryPlaceholders = [req.params.event_id];
	var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
			(err)?res.send(err):res.json({menu_items: data});
		})
});

router.get('/entertainment/:event_id', function(req, res, next) {
	const queryStr = 'SELECT transaction_date,v.item_id,name_description,units_purchased,cost_per_unit,rating,entertainment_type FROM`Transaction` AS t JOIN Transacted_Items AS dict ON t.transaction_id=dict.item_id JOIN Vendor_Item AS v ON dict.item_id=v.item_id JOIN Entertainment ON Entertainment.item_id=dict.item_id WHERE t.event_id=?;';
	const queryPlaceholders = [req.params.event_id];
	var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
			(err)?res.send(err):res.json({entertainment: data});
		})
});

router.get('/suppliers', function(req, res, next) {
		var queryStr = 'SELECT * FROM supplier WHERE TRUE ';
		var queryPlaceholders = [];
		if (req.query.supplier_id) {
			queryStr += 'AND supplier_id = ?, ';
			queryPlaceholders.push(req.query.supplier_id);
		}
		if (req.query.name) {
			queryStr += 'AND name = ?, ';
			queryPlaceholders.push(req.query.name);
		}
		if (req.query.contact_info) {
			queryStr += ' AND contact_info = ?, ';
			queryPlaceholders.push(req.query.contact_info);
		}
		if (req.query.type) {
			queryStr += 'AND type = ?, ';
			queryPlaceholders.push(req.query.type);
		}
    var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
        (err)?res.send(err):res.json({suppliers: data});
	})
	console.log(query.sql)
});
//
// Updates a row of Supplier info
router.put('/suppliers/:supplier_id', function(req, res, next) {
  var queryStr = 'UPDATE supplier SET ';
  var queryPlaceholders = [];
  if (req.body.name) {
    queryStr += 'name = ?, ';
    queryPlaceholders.push(req.body.name);
  }
  if (req.body.contact_info) {
    queryStr += 'contact_info = ?, ';
    queryPlaceholders.push(req.body.contact_info);
  }
  if (req.body.type) {
    queryStr += 'type = ? ';
    queryPlaceholders.push(req.body.type);
  }
  queryStr += 'WHERE supplier_id = ?';
  queryPlaceholders.push(req.body.supplier_id);
  var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
    (err)?res.send(err):res.json({suppliers: data})
  })
  console.log(query.sql)
});

// Delete a supplier
router.delete('/suppliers/:supplier_id', function(req, res, next) {
	const queryStr = 'DELETE FROM supplier WHERE supplier_id= ?';
	var query = connection.query(queryStr, [req.params.supplier_id], function(err, data) {
		(err)?res.send(err):res.json({suppliers: data})
	})
	console.log(query.sql)
});

// Updates a row of client info
router.put('/clients/:user_id', function(req, res, next) {
  var queryStr = 'UPDATE client SET ';
  var queryPlaceholders = [];
  if (req.body.first_name) {
    queryStr += 'first_name = ?, ';
    queryPlaceholders.push(req.body.first_name);
  }
  if (req.body.last_name) {
    queryStr += 'last_name = ?, ';
    queryPlaceholders.push(req.body.last_name);
  }
  if (req.body.phone_number) {
    queryStr += 'phone_number = ? ';
    queryPlaceholders.push(req.body.phone_number);
  }
  queryStr += 'WHERE user_id = ?';
  queryPlaceholders.push(req.body.user_id);
  var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
    (err)?res.send(err):res.json({clients: data})
  })
  console.log(query.sql)
});

// Delete a user
router.delete('/clients/:user_id', function(req, res, next) {
	const queryStr = 'DELETE FROM client WHERE user_id= ?';
	var query = connection.query(queryStr, [req.params.user_id], function(err, data) {
		(err)?res.send(err):res.json({clients: data})
	})
	console.log(query.sql)
});

// Get all events
router.get('/events', function(req, res, next) {
		var queryStr = 'SELECT * FROM Event';
    var query = connection.query(queryStr, function(err, data) {
        (err)?res.send(err):res.json({events: data})
	})
	console.log(query.sql)
});

// Updates a row of event info
router.put('/events/:event_id', function(req, res, next) {
  var queryStr = 'UPDATE event SET ';
  var queryPlaceholders = [];
  if (req.body.title) {
    queryStr += 'title = ?, ';
    queryPlaceholders.push(req.body.title);
  }
  if (req.body.location) {
    queryStr += 'location = ?, ';
    queryPlaceholders.push(req.body.location);
  }
  if (req.body.date) {
    queryStr += 'date = ? ';
    queryPlaceholders.push(req.body.date.substring(0, 10));
  }
  queryStr += 'WHERE event_id = ?';
  queryPlaceholders.push(req.body.event_id);
  var query = connection.query(queryStr, queryPlaceholders, function(err, data) {
    (err)?res.send(err):res.json({events: data})
  })
  console.log(query.sql)
});


// Delete an event
router.delete('/events/:event_id', function(req, res, next) {
		const queryStr = 'DELETE FROM Event WHERE event_id= ?';
	var query = connection.query(queryStr, [req.params.event_id], function(err, data) {
		(err)?res.send(err):res.json({events: data})
	})
	console.log(query.sql)
});

// Get events and cost per each event for a given user
router.get('/clients/:user_id', function(req, res, next) {
	const queryStr = 'SELECT event_id,`event_date`,LOCATION,title,SUM(units_purchased*cost_per_unit)FROM`Event` NATURAL JOIN Vendor_Item NATURAL JOIN`Transaction` NATURAL JOIN Transacted_Items WHERE user_id=? GROUP BY event_id,event_date,LOCATION,title'
    var query = connection.query(queryStr, [req.params.user_id], function(err, data) {
        (err)?res.send(err):res.json({clients: data})
    })
	console.log(query.sql);
});

module.exports = router;
