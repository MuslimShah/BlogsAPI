const Blogs = require('../models/blogs');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes')
const { BadRequest, unAuthenticatedError, notFond } = require('../errors');

//<=================== CREATING BLOG ========================>
//create blog==>Post
exports.createBlog = async(req, res) => {
        const data = req.body;
        data.userId = req.user.userId;
        const blog = await Blogs.create({...data });
        res.status(StatusCodes.CREATED).json({ blog, msg: 'job created' });
    }
    //get all blogs of user ==>single user==>owner
exports.getAllBlogs = async(req, res) => {
        //TODO :implement search in this based on keywords
        const userId = req.user.userId;
        const blogs = await Blogs.find({ userId });
        if (blogs.length === 0) {
            throw new notFond(`no blogs found with userId :${userId}`);
        }
        res.status(StatusCodes.OK).json({ blogs, count: blogs.length });


    }
    //get a single blog of ==>owner
exports.getBlog = async(req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    const blog = await Blogs.findOne({ _id: id, userId });
    if (!blog) {
        throw new notFond(`no user blog found with id :${id}`);
    }
    res.status(StatusCodes.OK).json({ blog });
}

//get all users blogs==>ALL BLOGS
exports.getAllUserBlogs = async(req, res) => {
    //TODO :implement search in this based on keywords
    const userId = req.user.userId;
    const blogs = await Blogs.find({});
    if (blogs.length === 0) {
        throw new notFond(`no blogs found }`);
    }
    res.status(StatusCodes.OK).json({ blogs, count: blogs.length });
}

//get all users single blog ==>FROM ALL BLOGS
exports.getAllUserBlog = async(req, res) => {
        const id = req.params.id;
        console.log(id);
        const blog = await Blogs.findOne({ _id: id });
        if (!blog) {
            throw new notFond(`no user blog found with id :${id}`);
        }
        res.status(StatusCodes.OK).json({ blog });
    }
    //<================= UPDATE BLOG =====================>
exports.updateBlog = async(req, res) => {

}

//<==================== DELETE BLOG ===================>
exports.deleteBlog = async(req, res) => {

}