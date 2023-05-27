require('express-async-errors');
require('dotenv').config();
const express = require('express');
const authRouts = require('./routes/auth')
const pageNotFound = require('./utils/page-not-found');
const errorHandler = require('./utils/error-handler');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'views');

app.use(authRouts);

//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);


const start = async() => {
    //write db connection here
    app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`))
}
start();