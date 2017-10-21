var mongoClient = require("mongodb").MongoClient;

var MongoConnection = function (callback) {
	this.db = null;
	this.usersCollection = null;

	var self = this;

	mongoClient.connect("mongodb://smarthack-db:UjorrT1vtsw2DOGjehGqq9lYOCbLCOTBZT7nz4m5ycp8YQMblqaYoVUyImEtjD5EdshoKI5iPgtwj8zuibNU6g==@smarthack-db.documents.azure.com:10255/?ssl=true", function (err, db) {
  		if (err) {
  			console.log(err);
  		} else {
  			self.db = db;
  			db.collection('users', function(err, collection) {
  				self.usersCollection = collection;
  				callback(null, db);
  			})
  		}
	});
}

MongoConnection.prototype.queryLogin = function (query, _cb) {
	var db_collection = this.usersCollection;

	db_collection.find(query).toArray(function (err, result) {
		if(err) {
			console.log(err);
		} else {
			_cb(null, result);
		}
	})
}

module.exports = MongoConnection;