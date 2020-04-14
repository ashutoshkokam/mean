const express = require('express');
const router = express.Router();
const PostController = require('../controllers/posts')
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');


//POST - ADD POST
router.post('', checkAuth,extractFile, PostController.addPost);
//GET ALL POSTS
router.get('', PostController.getAllPosts);
//DELETE
router.delete('/:id', checkAuth, PostController.deletePost);
//UPDATE
router.put("/:id", checkAuth,extractFile, PostController.updatePost)

router.get("/:id", PostController.getPost)
module.exports = router;