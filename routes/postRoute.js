const router = require('express').Router();
const postController = require('../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/events', postController.getEventsPosts);
router.get('/news', postController.getNewsPosts);
router.post('/', postController.createPost);
router.put('/:id',  postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/:id', postController.readPost);

// Comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);

module.exports = router; 