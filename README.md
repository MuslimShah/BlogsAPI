
<html>
<body>
    <h1>Blogs API</h1>
    <h2>Author</h2>
    <p>Muslim Shah</p>
    <h2>Date</h2>
     <p>May 28, 2023</p>
    <h2>Description</h2>
    <p>Blogs API in which user can create account ,login into account ,create blog ,update blog,delete blog ,read his own and other
	users blogs comment on a blog and can delete his comment</p>
    <h2>Getting Started</h2>
    <p>These instructions will get you a copy of the project up and running on your local machine.</p>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js</li>
        <li>MongoDB</li>
    </ul>
    <h3>Installation</h3>
    <ol>
        <li>Clone the repository.</li>
       <pre><code>git clone https://github.com/muslimshah/BlogsAPI.git</code></pre>
        <li>Install the dependencies.</li>
       <pre><code>npm install</code></pre>
        <li>Configure the environment variables.</li>
        <p>Create a <code>.env</code> file in the root directory and add the following:</p>
        <pre><code>MONGODB_URI=&lt;your MongoDB connection string&gt;JWTSECRET=&lt;your secret key for JWT&gt; JWTLIFETIME=&lt;jwt life time&gt; </code></pre>
        <li>Start the development server.</li>
	    <pre> <code>npm start</code></pre>
    </ol>
    <h2>API Routes</h2>
    <h2>Authentication</h2>	
    <ul>
	<h3>Register User</h3>  
        <li><strong>POST api/v1/auth/register</strong>: Register a new user. (Input: User data) (Response: JWT token and user name)</li>
        <p>Input:</p>
        <pre><code>{
    "name": "dummy",
    "email": "dummy@gmail.com",
    "password": "dummyPass123",
    "gender": "Male",
    "dateOfBirth": "01-01-2000",
    "phoneNumber": "+1234567890",
    "country": "Dummyland"
}</code></pre>
	  <h3>Login User</h3>  
        <li><strong>POST api/v1/auth/login</strong>: User login. (Input: Email and password) (Response: JWT token, user name, and success message)</li>
        <p>Input:</p>
        <pre><code>{
    "email": "dummy@gmail.com",
    "password": "dummyPass123"
}</code></pre>
    </ul>
    <h3>GET Blogs [Authentication Required]</h3>
    <ul><h4>Get All Blog Posts</h4>
        <li><strong>GET api/v1/</strong></li>
	 <h3>Response:</h3>
	 <pre><code>{"blogs": [<Blogs>],"count": number}</code></pre>
	  <h4>Get Single Blog Post</h4>
        <li><strong>GET api/v1/:id</strong></li>
	 <h3>Response:</h3>
	 <pre><code>{"blog": [<Blog>]}</code></pre>
	  <h4>Get All Users Blogs Posts</h4>
        <li><strong>GET api/v1/users/blogs</strong></li>
	 <h3>Response:</h3>
	 <pre><code>{"blogs": [<Blogs>],"count":number}</code></pre>
	  <h4>Get a Single User Blog Post By Id</h4>
        <li><strong>GET api/v1/users/blogs/:id</strong>: Get a single user blog by ID. (Response: Single user blog)</li>
	<h3>Response:</h3>
	 <pre><code>{"blog": [<Blog>]}</code></pre>
	</ul>
	<hr>
	<h3>Create Blog</h3>
<ul>
    <li><strong>POST api/v1/</strong></li>
    <p>Input:</p>
    <pre><code>{
    "title": "Dummy Blog",
    "content": "This is a dummy blog post."
}</code></pre>
    <h3>Response:</h3>
    <pre><code>{
    "blog": {
        "title": "Dummy Blog",
        "content": "This is a dummy blog post."
    },
    "msg": "Blog created"
}</code></pre>
<hr>
<h3>Update Blog</h3>
    <li><strong>PATCH api/v1/:id</strong></li>
    <p>Input:</p>
    <pre><code>{
    "title": "Updated Dummy Blog",
    "content": "This is the updated content of the dummy blog."
}</code></pre>
    <h3>Response:</h3>
    <pre><code>{
    "blog": {
        "title": "Updated Dummy Blog",
        "content": "This is the updated content of the dummy blog."
    }
}</code></pre>
<hr>
<h3>Delete Blog</h3>
    <li><strong>DELETE api/v1/:id</strong></li>
      <h3>Response:</h3>
    <pre><code>{
    "msg": "Blog with ID: <blogId> deleted successfully."
}</code></pre>
<hr>
<h3>Post comment</h3>
    <li><strong>Patch api/v1/users/blogs/:id</strong></li>
    <p>Input:</p>
    <pre><code>{
    "blogId": "<blogId>",
    "content": "This is a dummy comment."
}</code></pre>
     <h3>Response:</h3>
    <pre><code>{
    "msg": "Comment posted successfully."
}</code></pre>
<hr>
<h3>Delete Comment</h3>
    <li><strong>DELETE api/v1/users/blogs/comments/:commentId</strong></li>
     <h3>Response:</h3>
    <pre><code>{
    "msg": "Comment with ID: <commentId> deleted successfully."
}</code></pre>
</ul>
  <h2>Security Packages</h2>
      <ul>
        <li>helmet: Provides various security-related HTTP headers.</li>
        <li>cors: Enables Cross-Origin Resource Sharing (CORS) for handling requests from different domains.</li>
        <li>xss-clean: Prevents Cross-Site Scripting (XSS) attacks by sanitizing user input.</li>
        <li>express-limiter: Implements rate limiting to protect against brute force and denial-of-service attacks.</li>
      </ul>
      <h2>Error Handling</h2>
      <ul>
        <li>express-async-errors: Handles asynchronous errors in Express middleware and routes.</li>
      </ul>
</body>
</html>
