var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongo = require("mongodb");

var settings = {
  mongoServer : "localhost",
  mongoPort : 27017,
  mongoDb : "chemistry",
  mongoElementsCollection : "elements",
  mongoMoleculeCollection : "molecule",
  periodicTableFile : "./periodic-table.json"
};

var enableCors = function(response, end) {
  response.header("Access-Control-Allow-Origin", "http://localhost:3001");
  response.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name");
  response.header("Access-Control-Allow-Credentials", "true");
  
  if(end){
    response.writeHead(200);
    response.end();  
  }
};

router.post("/reload-pt", function (request, response) {
  var server = new mongo.Server(settings.mongoServer, settings.mongoPort, { auto_reconnect: true });
  var db = new mongo.Db(settings.mongoDb, server);
  var jsonPt = JSON.parse(fs.readFileSync(settings.periodicTableFile, 'utf8'));
  
  db.open(function (err, db) {
    jsonPt.forEach(function (element){
      if (!err) {
        db.collection(settings.mongoElementsCollection, function (err, collection) {
          collection.insert(element, { safe: true }, function (err, result) {
            if (err) {
              response.send(500).end();
              db.close();
            }
          });
        });
      }
    });
  });

  response.writeHead({ "Content-Type": "application/json" });
  response.status(201).end();
  db.close();
});

router.options("/",function (request, response) {
  enableCors(response,true);
});

router.get("/", function (request, response) {
  var server = new mongo.Server(settings.mongoServer, settings.mongoPort, { auto_reconnect: true });
  var db = new mongo.Db(settings.mongoDb, server);

  enableCors(response,false);

  db.open(function (err, db) {
    db.collection(settings.mongoElementsCollection, function (err, collection) {
      collection.find().toArray(function (error, documents) {
        var json = JSON.stringify(documents);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(json);
        db.close();
      });
    });
  });
  
});

/* creates a new molecule
 * params example: {"name":"water", "elements":[{"H":"2"},{"O":"1"}] }
*/
router.post("/molecule", function (request, response) {
  var server = new mongo.Server(settings.mongoServer, settings.mongoPort, { auto_reconnect: true });
  var db = new mongo.Db(settings.mongoDb, server);
  
  var newMolecule = request.body;

  db.open(function (err, db) {
    if (!err) {
      db.collection(settings.mongoMoleculeCollection, function (err, collection) {
        collection.insert(newMolecule, { safe: true }, function (err, result) {
          if (err) {
            response.send(500).end();
            db.close();
          }
        });
      });
    }
  });

  response.writeHead({ "Content-Type": "application/json" });
  response.status(201).end();
  db.close();
});

router.get("/molecule", function (request, response) {
  var server = new mongo.Server(settings.mongoServer, settings.mongoPort, { auto_reconnect: true });
  var db = new mongo.Db(settings.mongoDb, server);

  var theUrl = require("url").parse(request.url);
  var queryObj = require("querystring").parse(theUrl.query);
  var obj = JSON.parse(queryObj.elements);
  
  db.open(function (err, db) {
    db.collection(settings.mongoMoleculeCollection, function (err, collection) {
      collection.find({ "elements": obj.elements }).toArray(function (error, documents) {
        var json = JSON.stringify(documents);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(json);
        db.close();
      });
    });
  });
});

module.exports = router;
