//TODO: implement searching on specific keywords

//importing required files from import.js
const {
    express,
    authRouts,
    blogsRoutes,
    connectDB,
    pageNotFound,
    errorHandler,
    cors,
    helmet,
    xss,
    rateLimit
} = require('./config/import');
const auth = require('./utils/auth')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
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