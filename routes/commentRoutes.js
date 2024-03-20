const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Add a comment to a post
router.post('/:postId', commentController.addComment);

module.exports = router;