const mongoose = require('mongoose');

const connectDB = function(uri) {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(`==== connected to DB ===`);
}

module.exports = connectDB;