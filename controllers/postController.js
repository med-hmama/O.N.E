const Post = require("../models/postModel");

const createPost = async (req, res) => {
  const { title, message, type, image, video } = req.body;

  const newPost = new Post({
    posterId: req.user._id,
    title,
    message,
    type,
    image,
    video,
    comments: [],
  });

  try {
    await newPost.save();
    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  const posterId = post.posterId.toString();
  const userId = req.user._id.toString();

  if (posterId == userId) {
    const { title, message, type, image, video } = req.body;

    let updatedFields = {
      title,
      message,
      type,
      image,
      video,
    };

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        updatedFields
      );

      if (updatedPost) {
        await res.json({
          message: "Post updated successfully",
          updatedPost,
        });
      } else {
        res.status(404).json("Post not found");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("Only the post owner can update it.");
  }
};

const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.deleteOne({ _id: post._id });
    res.json({ message: "Post deleted successfully." });
  } else {
    res.status(404).json("Post not found");
  }
};

// Display functions
const getAllPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
};

const postInfo = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json("Post not found.");
  }
};

const getCurrentUserPosts = async (req, res) => {
  const posts = await Post.find({ posterId: req.user._id });

  if (posts) {
    res.json(posts);
  } else {
    res.status(404).json("User not found.");
  }
};

const getEventsPosts = async (req, res) => {
  const events = await Post.find({ type: "event" })
    .populate({ path: "posterId", select: ["name", "firstName"] })
    .populate({ path: "comments.commenterId", select: ["name", "firstName"] });
  res.status(200).json(events);
};

const getNewsPosts = async (req, res) => {
  const events = await Post.find({ type: "news" })
    .populate({ path: "posterId", select: ["name", "firstName"] })
    .populate({ path: "comments.commenterId", select: ["name", "firstName"] });
  res.status(200).json(events);
};

//COMMENTS FUNCTIONS

const commentPost = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    )
      .populate({ path: "posterId", select: ["name", "firstName"] })
      .populate({
        path: "comments.commenterId",
        select: ["name", "firstName"],
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const editCommentPost = (req, res) => {
  try {
    return Post.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    })
      .populate({ path: "posterId", select: ["name", "firstName"] })
      .populate({
        path: "comments.commenterId",
        select: ["name", "firstName"],
      });
  } catch (err) {
    return res.status(400).send(err);
  }
};

const deleteCommentPost = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.status(200).json({ message: "Succefully deleted" });
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  postInfo,
  getAllPosts,
  getCurrentUserPosts,
  getEventsPosts,
  getNewsPosts,
  commentPost,
  editCommentPost,
  deleteCommentPost,
};
