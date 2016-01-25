var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('mycollection');
  collection.find({},{}, function(e, docs) {
  	res.render('userlist', { 'userlist': docs });
  });
  
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/*POST to add user service*/
router.post('/adduser', function(req, res) {
	//set internal db variable
	var db = req.db;

	//get form values. these rely on the name attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//set our collection
	var collection = db.get('mycollection');


	//submit to the DB
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function(err, doc) {
		if(err) {
			//db write fail, return error
			res.send('there was problem adding information to the database');
		}
		else {
			res.redirect('userlist');
		}
		}
	);
});

module.exports = router;
