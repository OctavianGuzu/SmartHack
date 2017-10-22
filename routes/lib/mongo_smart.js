var mongoClient = require("mongodb").MongoClient;
var async = require('async');

var MongoConnection = function (callback) {
	this.db = null;
	this.usersCollection = null;
	this.tasksCollection = null;

	var self = this;

	mongoClient.connect("mongodb://smarthack-db:UjorrT1vtsw2DOGjehGqq9lYOCbLCOTBZT7nz4m5ycp8YQMblqaYoVUyImEtjD5EdshoKI5iPgtwj8zuibNU6g==@smarthack-db.documents.azure.com:10255/?ssl=true", function (err, db) {
  		if (err) {
  			console.log(err);
  		} else {
  			self.db = db;
  			async.series({
				Users: function (cb) {
                    db.collection('users', function(err, collection) {
                        self.usersCollection = collection;
                        cb(null);
                    })
				},
				Tasks: function (cb) {
                    db.collection('tasks', function(err, collection) {
                        self.tasksCollection = collection;
                        cb(null);
                    })
				},
				Final: function(cb) {
					callback(null, db);
				}
			});
  		}
	});
};

MongoConnection.prototype.queryLogin = function (query, _cb) {
	var db_collection = this.usersCollection;

	db_collection.find(query).toArray(function (err, result) {
		if(err) {
			console.log(err);
		} else {
			_cb(null, result);
		}
	})
};

MongoConnection.prototype.queryFetchTasks = function (query, _cb) {
    var db_collection = this.tasksCollection;

    db_collection.find(query).toArray(function (err, result) {
        if(err) {
            console.log(err);
        } else {
            _cb(null, result);
        }
    })
};

MongoConnection.prototype.addTask = function (query, _cb) {
	var db_collection = this.tasksCollection;

	db_collection.insertOne(query, function (err, res) {
		_cb(err, res);
	});
}

MongoConnection.prototype.doneTask = function(query, _cb) {
	var db_collection = this.tasksCollection;
	console.log(query);
	db_collection.deleteOne(query, function(err, res) {
		console.log(err);
		_cb(err, res);
	})
}

module.exports = MongoConnection;