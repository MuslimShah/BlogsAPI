# Blogs API

## Author

Muslim Shah

## Date

May 28, 2023

## Description

Blogs API in which users can create an account, login, create a blog, update a blog, delete a blog, read their own and others' blogs, comment on a blog, and delete their comments.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/muslimshah/BlogsAPI.git
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Configure the environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```
     MONGODB_URI=<your MongoDB connection string>
     JWTSECRET=<your secret key for JWT>
     JWTLIFETIME=<jwt life time>
     ```
4. Start the development server:
   ```
   npm start
   ```

## Official Documentation

For more detailed information, refer to the [official documentation](https://blogs-api-ebon.vercel.app/).

## Security Packages Used

- helmet: Provides various security-related HTTP headers.
- cors: Enables Cross-Origin Resource Sharing (CORS) for handling requests from different domains.
- xss-clean: Prevents Cross-Site Scripting (XSS) attacks by sanitizing user input.
- express-limiter: Implements rate limiting to protect against brute force and denial-of-service attacks.

## Error Handling

- express-async-errors: Handles asynchronous errors in Express middleware and routes.
