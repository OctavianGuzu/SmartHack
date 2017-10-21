var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.render('login');
});

router.get('/dashboard', function (req, res) {
	res.render('index');
});

module.exports = router;