const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send('Post not found.');
    }
    const newComment = await Comment.create({ postId, comment });
    post.comments.push(newComment);
    await post.save();
    res.redirect(`/posts/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while adding the comment.');
  }
};