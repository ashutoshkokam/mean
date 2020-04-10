const express = require('express');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

let fetchedPosts;
//POST - ADD POST
router.post('',checkAuth, (req, res, next) => {
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
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery= Post.find();
    if(pageSize && currentPage){
        postQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    postQuery
    .then((docs)=>{
        fetchedPosts = docs;
        return Post.count()
    })
        .then((count) => {
            res.status(200).json({
                message: "Success!",
                posts: fetchedPosts,
                maxPosts: count
            });

        });

});
//DELETE
router.delete('/:id',checkAuth, (req, res, next) => {
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
router.put("/:id",checkAuth, (req, res, next) => {
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