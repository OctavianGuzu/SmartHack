var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://smarthack-db:UjorrT1vtsw2DOGjehGqq9lYOCbLCOTBZT7nz4m5ycp8YQMblqaYoVUyImEtjD5EdshoKI5iPgtwj8zuibNU6g==@smarthack-db.documents.azure.com:10255/?ssl=true", function (err, db) {
    db.collection('tasks').insertOne( {
        "name": "Do something",
        "Assignee": "Luminita Costache",
        "Assigner": "Valeriu Amariei",
        "Due Date":"2017/11/08",
        "Date Created":"2017/10/08",
        "Description":"Lumi, you are expected in my office",
    }, function(err, result) {
    });
    db.collection('tasks').insertOne( {
        "name": "Do something else",
        "Assignee": "Luminita Costache",
        "Assigner": "Valeriu Amariei",
        "Due Date":"2017/12/08",
        "Date Created":"2017/11/08",
        "Description":"Still waiting, honey",
    }, function(err, result) {
    });
    db.collection('tasks').insertOne( {
        "name": "Task for Ion",
        "Assignee": "Ion Popescu",
        "Assigner": "Luminita Costache",
        "Due Date":"2016/10/09",
        "Date Created":"2016/10/08",
        "Description":"Ioane, e de anul  trecut, il termini si tu odata?",
    }, function(err, result) {
    });
    db.collection('tasks').insertOne( {
        "name": "Placheolder Description",
        "Assignee": "Luminita Costache",
        "Assigner": "Valeriu Amariei",
        "Due Date":"2017/11/08",
        "Date Created":"2017/10/08",
        "Description":"Lumi, you are expected in my office",
    }, function(err, result) {
    });
    db.collection('tasks').insertOne( {
        "name": "Placheolder Description1",
        "Assignee": "Luminita Costache",
        "Assigner": "Valeriu Amariei",
        "Due Date":"2017/11/08",
        "Date Created":"2017/10/08",
        "Description":"Lumi, you are expected in my office",
    }, function(err, result) {
    });
});


