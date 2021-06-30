var MongoClient = require('mongodb').MongoClient;

var mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

module.exports = {
  init: function () {
    console.dir("Initializing database");
    MongoClient.connect(conf.mongo.url, mongoOptions, function(err, client) {
      console.dir("Connected...");
      if(err) {
        console.dir(`dbinit: Failed to connect to mongodb: ${err}`);
        return(false);
      }

      var db = client.db(conf.mongo.dbName);
      console.dir(`dbinit: ${conf.mongo.dbName} database connected or created.`);

      var collections = conf.mongo.collections;
      collections.foreEach((collection) => {
        db.createCollection(collection, function(err, result) {
          if(err) {
            console.dir(`dbinit: Failed to create collection ${collection}}: ${err}`);
            return(false); 
          }

          console.dir(`dbinit: ${collection} collection connected or created.`);
        });
      });
    });
    return(true);
  },

  getAllRecords: function(collection) {
    return new Promise((resolve,reject) => {
      MongoClient.connect(collection, mongoOptions, function (err, client) {
        if(err) reject(err);

        var db = client.db(conf.mongo.dbName);

        db.collection(collection).find({}).toArray(function(err, result) {
          if (err) reject(err);

          console.dir("getAllRecords:result: " + JSON.stringify(result));

          client.close();

          resolve(result);
        });
      });
    });
  },

  getRecordbyId: function(collection,id) {
    return new Promise((resolve,reject) => {
      var filter = { "_id": { "$eq": id } }
      MongoClient.connect(conf.mongo.url, mongoOptions, function (err, client) {
        if(err) reject(err);

        var db = client.db(conf.mongo.dbName);

        db.collection(collection).find(filter).toArray(function(err, result) {
          if (err) reject(new Error(err));

          console.dir("getRecordById:result: " + JSON.stringify(result));

          client.close();

          resolve(result);
        });
      });
    });
  },

  getRecordbyFilter: function(collection,filter) {
    return new Promise((resolve,reject) => {
      MongoClient.connect(conf.mongo.url, mongoOptions, function (err, client) {
        if(err) reject(err);

        var db = client.db(conf.mongo.dbName);

        db.collection(collection).find(filter).toArray(function(err, result) {
          if (err) reject(new Error(err));

          console.dir("getRecordById:result: " + JSON.stringify(result));

          client.close();

          resolve(result);
        });
      });
    });
  },

  insertRecord: function(collection,data) {
    return new Promise((resolve,reject) => {
      console.dir(`insertRecord(${data})`);
      console.dir(JSON.stringify(data));
      if(!data) {
        var error = new Error("Nothing to insert");
        reject(error);
      }

      MongoClient.connect(collection, mongoOptions, function (err, client) {
        if(err) {
          var error = new Error("insertRecord: Failed to connect to database: " + err);
          reject(error);
        }

        var db = client.db(conf.mongo.dbName);

        db.collection(collection).insertOne(data, function(err, result) {
          if (err) reject(new Error(err));

          client.close();

          console.dir("insertRecord: Document inserted!");

          resolve(result);
        });
      });
    });
  },

  deleteRecord: function(collection, id) {
    return new Promise((resolve,reject) => {

      if(!id) {
        var error = new Error("deleteRecord: Incoming data is missing, nothing to delete");
        reject(error);
      }


      var filter = { _id: id };

      MongoClient.connect(collection, mongoOptions, function (err, client) {
        if(err) {
          console.error("updateRecord: Failed to connect to database: " + err);
          reject(err);
        }

        var db = client.db(conf.mongo.dbName);

        db.collection(collection.deleteOne(filter, function(err, result) {
          if (err) reject(new Error(err));

          console.dir(`${id} deleted`);

          db.close();
        }));
      });
    });
  },

  updateRecord: function(collection, id, data) {
    return new Promise((resolve,reject) => {
      console.dir(`updateRecord(${collection}, ` + JSON.stringify(newData) + `)`);

      var filter = {
        "data.transactionId": { "$eq": newData.data.transactionId }
      }

      if(!newData) {
        console.error("updateRecord: Incoming data is missing, nothing to replace");
        reject("Nothing to insert");
      }

      MongoClient.connect(collection, mongoOptions, function (err, client) {
        if(err) {
          console.error("updateRecord: Failed to connect to database: " + err);
          reject(err);
        }

        var db = client.db(conf.mongo.dbName);

        var filter = { _id: id };

        db.collection(collection).replaceOne(filter, data, { upsert: true }, function(err, result) {
          if (err) {
            console.error("updateRecord: Failed to replaceOne: " + JSON.stringify(err));
            reject(err);
          }

          client.close();

          console.dir("updateRecord: Document replaced!");

          resolve(result);
        });
      });
    });
  }
}
