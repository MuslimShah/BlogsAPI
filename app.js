require('express-async-errors');
require('dotenv').config();
const express = require('express');
const authRouts = require('./routes/auth')
const connectDB = require('./database/database');
const pageNotFound = require('./utils/page-not-found');
const errorHandler = require('./utils/error-handler');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'views');

app.use('/api/v1/auth', authRouts);

//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);


const start = async() => {
    //connecting to db
    console.log('Initializing ...');
    connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`))
}
start();