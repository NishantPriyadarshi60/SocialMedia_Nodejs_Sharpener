const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('index', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching posts.');
  }
};

exports.createPostForm = (req, res) => {
  res.render('create');
};

exports.createPost = async (req, res) => {
  try {
    const { description } = req.body;
    const imagePath = req.file ? req.file.path : null;
    const post = await Post.create({ description, imagePath });
    res.redirect(`/posts/${post.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while creating the post.');
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found.');
    }
    res.render('post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while fetching the post.');
  }
};