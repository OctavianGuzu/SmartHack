var express = require('express');
var router = express.Router();
var MongoConnection = require( "./lib/mongo_smart" );
var sha256 = require('sha256');
var globalFullName = "";

var MongoConnectionObj = new MongoConnection(function (err) {
	if (err) {
		console.log("Mongo connection error: " + err);
		process.exit(1);
	} else {
		console.log( "Mongo connected and ready to go !!!" );
	}
});

router.get('/', function (req, res) {
	res.render('login');
});

router.get('/dashboard', function (req, res) {
	res.render('index');
});

router.get('/register', function (req, res) {
	res.render('register');
});

router.get('/forgot-pass', function (req, res) {
	res.render('forgot-password');
});

router.get('/checkLogin', function (req, res) {
	var response = {
		status_code : 0,
        status_message : "success",
        data : false
	};
	if("email" in req.query) {
		if("pass" in req.query) {
			MongoConnectionObj.queryLogin({email: req.query.email}, function(err, data) {
				if (err) {
					response.data = false;
					res.json(response);
				} else {
					if(data.length > 0) {
						var hash = sha256(req.query.pass);
						if(hash == data[0].pass) {
							globalFullName = "" + data[0].prenume + " "  + data[0].nume;
                            console.log(globalFullName);
							response.data = true;
							res.json(response);
						}
					} else {

						response.data = false;
						res.json(response);
					}
				}
			})
		}
	} else {
		response.data = false;
		res.json(response);
	}
});

router.get('/fetchTasks', function (req, res) {
	var response = {
        status_code : 0,
        status_message : "success",
        data : ""
    };

    MongoConnectionObj.queryFetchTasks({Assignee: globalFullName}, function(err, data) {
    	if (err) {
			response.data = false;
			console.log("Err");
			res.json(response);
		} else {
			if(data.length > 0) {
				response.data = data;
                res.json(response);
			} else {
				response.data = false;
				res.json(response);
			}
		}
    });
});


router.get('/fetchMessages', function (req, res) {
    var response = {
        status_code : 0,
        status_message : "success",
        data : ""
    };

    MongoConnectionObj.queryFetchMessages({receiver: globalFullName}, function(err, data) {

    	if (err) {
            response.data = false;
            console.log("Err");
            res.json(response);
        } else {
            if(data.length > 0) {
                response.data = data;
                res.json(response);
            } else {
                response.data = false;
                res.json(response);
            }
        }
    });
});

router.get('/addMessage', function (req, res) {
	var response = {
        status_code : 0,
        status_message : "success",
        data : ""
    };

    MongoConnectionObj.addMessage({
		sender:req.query.sender,
        receiver: req.query.receiver,
        subject: req.query.subject,
        message: req.query.message
    }, function(err, respond) {
        console.log("Inserted in db");
        console.log(err);
        res.json(response);
    })});

router.get('/addTask', function (req, res) {
	var response = {
        status_code : 0,
        status_message : "success",
        data : ""
    };

    MongoConnectionObj.addTask({
    	name: req.query.taskName,
    	Assignee: req.query.assignee,
    	Assigner: req.query.assigner,
    	"Due Date": req.query.dueDate,
    	"Date Created": getCurrentDate(),
    	"Description": req.query.descriptionTask,
    	"Priority": req.query.priority,
    	"id": generateID()
    }, function(err, res) {
    	console.log("Inserted in db");
    	console.log(err);
    	res.json(response);
    })


});

router.get('/getLoggedUser', function (req, res) {
    var response = {
        status_code : 0,
        status_message : "success",
        data : globalFullName
    };
	res.json(response);
});

router.get('/doneTask', function (req, res) {
	var response = {
        status_code : 0,
        status_message : "success",
        data : ""
    };

    MongoConnectionObj.doneTask({id: parseInt(req.query.taskID, 10)}, function (err, blabla) {
    	res.json(response);
    })
});

var getCurrentDate = function() {
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();

	return year + "/" + ("0" + month).slice(-2) + "/" + day;
}

var generateID = function() {
	var val = Math.floor(1000 + Math.random() * 9000);
	return val;
}

module.exports = router;