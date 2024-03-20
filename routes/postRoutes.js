const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Get all posts
router.get('/', postController.getAllPosts);

// Create a new post
router.get('/create', postController.createPostForm);
router.post('/create', postController.createPost);

// View a specific post
router.get('/:id', postController.getPostById);

module.exports = router;