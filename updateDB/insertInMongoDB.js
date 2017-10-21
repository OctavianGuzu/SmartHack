var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://smarthack-db:UjorrT1vtsw2DOGjehGqq9lYOCbLCOTBZT7nz4m5ycp8YQMblqaYoVUyImEtjD5EdshoKI5iPgtwj8zuibNU6g==@smarthack-db.documents.azure.com:10255/?ssl=true", function (err, db) {
db.collection('users').insertOne( {
        "nume": "Popescu",
        "prenume": "Ion",
        "email": "popescu.ion@xortheworld.com",
        "pass":"a80b568a237f50391d2f1f97beaf99564e33d2e1c8a2e5cac21ceda701570312",
    }, function(err, result) {
    });
db.collection('users').insertOne( {
        "nume": "Amariei",
        "prenume": "Valeriu",
        "email": "amariei.valeriu@xortheworld.com",
        "pass":"a80b568a237f50391d2f1f97beaf99564e33d2e1c8a2e5cac21ceda701570312",
    }, function(err, result) {
    });
db.collection('users').insertOne( {
        "nume": "Costache",
        "prenume": "Luminita",
        "email": "costache.luminita@xortheworld.com",
        "pass":"a80b568a237f50391d2f1f97beaf99564e33d2e1c8a2e5cac21ceda701570312",
    }, function(err, result) {
    });
});


