const postController = require('../controllers/post.controller');
const userController = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();
//userController.loginRequired,
router.get('/',  postController.getAllPosts);
router.post("/", postController.createPost);
router.get('/:id', postController.getPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
