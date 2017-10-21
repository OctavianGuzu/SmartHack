var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.render('login');
});

router.get('/dashboard', function (req, res) {
	res.render('index');
});

router.get('/checkLogin', function (req, res) {
	console.log(req.query.email);

	var response = {
		status_code : 0,
        status_message : "success",
        data : null
	};

	res.json(response);
});

module.exports = router;