const express = require('express');
const Post = require('../models/post');

const router = express.Router();

//POST - ADD POST
router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then((data) => {
        //console.log(data);
        res.status(201).json({
            message: "post added",
            id: data._id
        });
    });//console.log(post);

});
//GET ALL POSTS
router.get('', (req, res, next) => {
    Post.find()
        .then((docs) => {
            res.status(200).json({
                message: "Success!",
                posts: docs
            });

        });

});
//DELETE
router.delete('/:id', (req, res, next) => {
    const postId = req.params.id;
    //console.log(postId);
    Post.deleteOne({ _id: postId }).then((ret) => {
        //console.log(ret);
        res.status(200).json({
            message: "Success",

        })
    })
});
//UPDATE
router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post)
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "Updated"
            })
        })
})

router.get("/:id", (req, res, next) => {

    Post.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            }
            else {
                res.status(404).json({
                    message: 'Post nt Found!'
                })
            }
        }).catch()

})
module.exports = router;