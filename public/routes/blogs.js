const express = require('express');
//FETCHING CONTROLLERS
const {
    createBlog,
    getAllBlogs,
    getBlog,
    getAllUserBlog,
    getAllUserBlogs,
    updateBlog,
    deleteBlog,
    postComment,
    deleteComment
} = require('../contollers/blogs');
const router = express.Router();
//GET ====>getting blogs
router.get('/', getAllBlogs);

//GET ===> SINGLE BLOG
router.get('/:id', getBlog);
//GET ==> ALL USERS BLOGS
router.get('/users/blogs', getAllUserBlogs)
    //GET ==>SINGLE USER BLOG
router.get('/users/blogs/:id', getAllUserBlog);
//POST===>creating blog
router.post('/', createBlog);
//PATCH===>updating blog
router.patch('/:id', updateBlog);
//comment on blog
router.patch('/users/blogs/:id', postComment);
//DELETE==>USER HIS OWN COMMENT
router.delete('/users/comments/:commentId', deleteComment);
//DELETE==>deleing blog
router.delete('/:id', deleteBlog);
module.exports = router;