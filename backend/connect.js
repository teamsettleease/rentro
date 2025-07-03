const mongoose = require("mongoose");

async function connectToMongoDb(url){
    return await mongoose.connect(url);
}

module.exports = connectToMongoDb;