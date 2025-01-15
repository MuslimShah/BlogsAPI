/*********************************************
 * Project name: Blogs API
 * Author: Muslim Shah
 * Date: 28/5/2023
 *
 * Description: Blogs API in which users can create an account, login, create, update, and delete blogs,
 * read their own and other users' blogs, comment on a blog, and delete their comments.
 *
 * Routes Handled:
 * - api/v1/auth/register
 * - api/v1/auth/login (GET)
 * - Blogs [Authentication Required]
 *    - GET api/v1/
 *    - GET api/v1/:id
 *    - GET api/v1/users/blogs
 *    - GET api/v1/users/blogs/:id
 *    - Create Blog (POST api/v1/)
 *    - Update Blog (PATCH api/v1/:id)
 *    - Delete Blog (DELETE api/v1/:id)
 *    - Post Comment
 *       - PATCH api/v1/users/blogs/:id
 *       - Delete Comment (DELETE api/v1/users/blogs/comments/:commentId)
 *
 * Security Packages Used:
 * - helmet: Provides various security-related HTTP headers.
 * - cors: Enables Cross-Origin Resource Sharing (CORS) for handling requests from different domains.
 * - xss-clean: Prevents Cross-Site Scripting (XSS) attacks by sanitizing user input.
 * - express-limiter: Implements rate limiting to protect against brute force and denial-of-service attacks.
 *
 * Error Handling:
 * - express-async-errors: Handles asynchronous errors in Express.js.
 *********************************************/

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
  rateLimit,
} = require("./config/import");
require("dotenv").config();
const auth = require("./utils/auth");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.set("view engine", "views");

//routes
app.use("/api/v1/auth", authRouts);
app.use("/api/v1/", auth,blogsRoutes);

//page not found middleware
app.use(pageNotFound);
//error handler middleware
app.use(errorHandler);
//start function for starting server
const start = async () => {
  //connecting to db
  console.log("Initializing ...");
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, "0.0.0.0", () => console.log(`CONNECTED ON PORT ${PORT}`));
  } catch (error) {
    console.log("database connection error");
  }
};
start();
