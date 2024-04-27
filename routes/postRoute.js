const router = require("express").Router();

const {
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
} = require("../controllers/postController");

router.route("/").get(getAllPosts).post(createPost);

router.get("/events", getEventsPosts);
router.get("/news", getNewsPosts);

router.get("/current", getCurrentUserPosts);

router.route("/:id").put(updatePost).delete(deletePost).get(postInfo);

router.patch("/comment-post/:id", commentPost);
router.patch("/edit-comment-post/:id", editCommentPost);
router.patch("/delete-comment-post/:id", deleteCommentPost);

module.exports = router;
