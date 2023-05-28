const express = require('express');
const { createBlog, getAllBlogs, getBlog, getAllUserBlog, getAllUserBlogs, updateBlog, deleteBlog, postComment, deleteComment } = require('../contollers/blogs');
const router = express.Router();


//GET ====>getting blogs
router.get('/', getAllBlogs);
router.get('/:id', getBlog);
router.get('/users/blogs', getAllUserBlogs)
router.get('/users/blogs/:id', getAllUserBlog);
//POST===>creating blog
router.post('/', createBlog);
//PATCH===>updating blog
router.patch('/:id', updateBlog);
//comment on blog
router.patch('/users/blogs/:id', postComment);
router.delete('/users/comments/:commentId', deleteComment);
//DELETE==>deleing blog
router.delete('/:id', deleteBlog);
module.exports = router;