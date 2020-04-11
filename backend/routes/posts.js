const express = require('express');
const router = express.Router();
const PostController = require('../controllers/posts')
const checkAuth = require('../middleware/check-auth');


//POST - ADD POST
router.post('', checkAuth, PostController.addPost);
//GET ALL POSTS
router.get('', PostController.getAllPosts);
//DELETE
router.delete('/:id', checkAuth, PostController.deletePost);
//UPDATE
router.put("/:id", checkAuth, PostController.updatePost)

router.get("/:id", PostController.getPost)
module.exports = router;