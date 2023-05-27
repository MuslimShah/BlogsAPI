//TODO: implement searching on specific keywords
//TODO:implement comment functionality
const { express, authRouts, blogsRoutes, connectDB, pageNotFound, errorHandler } = require('./config/import');
const auth = require('./utils/auth')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set('view engine', 'views');

//routes
app.use('/api/v1/auth', authRouts);
app.use('/api/v1/', auth, blogsRoutes);

//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);
//start function for starting server
const start = async() => {
    //connecting to db
    console.log('Initializing ...');
    connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`CONNECTED ON PORT ${PORT}`))
}
start();