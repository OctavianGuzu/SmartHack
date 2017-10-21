var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://smarthack-db:UjorrT1vtsw2DOGjehGqq9lYOCbLCOTBZT7nz4m5ycp8YQMblqaYoVUyImEtjD5EdshoKI5iPgtwj8zuibNU6g==@smarthack-db.documents.azure.com:10255/?ssl=true", function (err, db) {
db.collection('users').deleteMany( 
        { "Nume": "Gigel" },
    function(err, results) {
    });
});