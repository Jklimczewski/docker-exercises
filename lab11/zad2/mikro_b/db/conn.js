const {MongoClient} = require("mongodb");
const Db = "mongodb://mongodb-service:27017/test"
console.log(Db);
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
    connectToServer: function(callback) {
        client.connect(function (err, db) {
            if (err || !db) {
              return callback(err);
            }
            dbConnection = db.db("test");
            console.log("Successfully connected to MongoDB.");
            return callback();
        });
    },
    getDb: function() {
        return dbConnection;
    },
};