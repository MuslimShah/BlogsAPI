const Blogs = require('../models/blogs');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes')
const {
    BadRequest,
    unAuthenticatedError,
    resourceNotFound
} = require('../errors');

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
        const search = req.query.search;
        const query = { userId: userId, deleted: false };
        //search for a specific title
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const blogs = await Blogs.find(query).populate('comments.userId', 'name');
        if (blogs.length === 0) {
            throw new resourceNotFound(`no blogs found with userId :${userId}`);
        }
        res.status(StatusCodes.OK).json({ blogs, count: blogs.length });
    }
    //get a single blog of ==>owner
exports.getBlog = async(req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    const blog = await Blogs.findOne({ _id: id, userId, deleted: false }).populate('comments.userId', 'name');
    if (!blog) {
        throw new resourceNotFound(`no user blog found with id :${id}`);
    }
    res.status(StatusCodes.OK).json({ blog });
}

//get all users blogs==>ALL BLOGS
exports.getAllUserBlogs = async(req, res) => {
    //TODO :implement search in this based on keywords
    const userId = req.user.userId;
    const search = req.query.search;
    const query = { userId: userId, deleted: false };
    //search for a specific title
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    const blogs = await Blogs.find(query).populate('comments.userId', 'name');
    if (blogs.length === 0) {
        throw new resourceNotFound(`no blogs found }`);
    }
    res.status(StatusCodes.OK).json({ blogs, count: blogs.length });
}

//get all users single blog ==>FROM ALL BLOGS
exports.getAllUserBlog = async(req, res) => {
        const id = req.params.id;
        console.log(id);
        const blog = await Blogs.findOne({ _id: id, deleted: false }).populate('comments.userId', 'name');
        if (!blog) {
            throw new resourceNotFound(`no user blog found with id :${id}`);
        }
        res.status(StatusCodes.OK).json({ blog });
    }
    //<================= UPDATE BLOG =====================>
exports.updateBlog = async(req, res) => {
    const userId = req.user.userId;
    const blogId = req.params.id;
    const data = req.body;
    const updatedBlog = await Blogs.findOneAndUpdate({ _id: blogId, userId, deleted: false }, data, { runValidators: true, new: true }).populate('comments.userId', 'name');
    if (!updatedBlog) {
        throw new resourceNotFound(`no user blog found with id :${blogId}`);
    }
    res.status(StatusCodes.OK).json({ blog: updatedBlog });
}

//<==================== DELETE BLOG ===================>

exports.deleteBlog = async(req, res) => {
    const userId = req.user.userId;
    const blogId = req.params.id;
    //performing soft delete ===>only changing status
    const updatedBlog = await Blogs.findOneAndUpdate({ _id: blogId, userId, deleted: false }, { deleted: true }, { runValidators: true, new: true });
    if (!updatedBlog) {
        throw new resourceNotFound(`no user blog found with id :${blogId}`);
    }
    res.status(StatusCodes.OK).json({ msg: `record with id:${blogId} deleted successfully` });

}

//<--------------- COMMENT SECTION ------------------------>

//Patch==>post comment
exports.postComment = async(req, res) => {
    const userId = req.user.userId;
    const blogId = req.params.id;
    const content = req.body.content;
    const blog = await Blogs
        .findOneAndUpdate({ _id: blogId }, { $push: { comments: { userId: userId, comment: content } } }, { runValidators: true, new: true })
    if (!blog) {
        throw new resourceNotFound(`no user blog found with id :${blogId}`);
    }

    res.status(StatusCodes.OK).json({ msg: `comment with id:${blogId} done successfully` });


}

// <------------------ DELETE COMMENT ------------------------->
//pull==>delete comment

exports.deleteComment = async(req, res) => {
    const userId = req.user.userId;
    const blogId = req.query.blogId;
    const commentId = req.params.commentId;
    const blog = await Blogs
        .findOneAndUpdate({ _id: blogId }, { $pull: { comments: { _id: commentId, userId: { _id: userId } } } }, { runValidators: true, new: true })
    if (!blog) {
        throw new resourceNotFound(`no comment found with id :${commentId}`);
    }

    res.status(StatusCodes.OK).json({ msg: `comment with id:${commentId} deleted successfully` });


}