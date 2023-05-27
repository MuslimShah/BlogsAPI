const Blogs = require('../models/blogs');
// const User = require('../models/user')
const { BadRequest, unAuthenticatedError, notFond } = require('../errors');

//<=================== CREATING BLOG ========================>
//create blog==>Post
exports.createBlog = async(req, res) => {

    }
    //get all blogs of user ==>single user==>owner
exports.getAllBlogs = async(req, res) => {
        res.send('hello  blogs')
    }
    //get a single blog of ==>owner
exports.getBlog = async(req, res) => {

    }
    //get all users blogs==>ALL BLOGS
exports.getAllUserBlogs = async(req, res) => {

}

//get all users single blog ==>FROM ALL BLOGS
exports.getAllUserBlog = async(req, res) => {

    }
    //<================= UPDATE BLOG =====================>
exports.updateBlog = async(req, res) => {

}

//<==================== DELETE BLOG ===================>
exports.deleteBlog = async(req, res) => {

}