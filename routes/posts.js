const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
// Get all the posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.json({ massage: err });
  }
});

// Submits a posts
router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  post.save();
  res.send(post);
});
// Spec posts
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.send(post);
  } catch (err) {
    res.send({ massage: err });
  }
});
// Delete post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.send({ massage: err });
  }
});
// Update post
router.patch("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    Object.assign(post, req.body);
    res.send(post);
    post.save();
  } catch (error) {
    res.send({ massage: error });
  }
});

module.exports = router;
