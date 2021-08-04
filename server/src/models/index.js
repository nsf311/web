const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.url = dbConfig.url;
db.bos311Hex = require("./bos311.model.js")(mongoose);
db.mongoose = mongoose;
module.exports = db;
