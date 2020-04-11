const Post = require('../models/post');
let fetchedPosts;

exports.addPost = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.userData.userId
    });
    post.save().then((data) => {
        //console.log(data);
        res.status(201).json({
            message: "post added",
            id: data._id
        });
    })
    .catch((err)=>{
        res.status(500).json({message:"Post Creation Failed"})
    })
    ;//console.log(post);

}

exports.getAllPosts = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery
        .then((docs) => {
            fetchedPosts = docs;
            return Post.count()
        })
        .then((count) => {
            res.status(200).json({
                message: "Success!",
                posts: fetchedPosts,
                maxPosts: count
            });

        }).catch(err=>{
            res.status(500).json({message:"Fetching Post Failed!"})
        });

}

exports.deletePost = (req, res, next) => {
    const postId = req.params.id;
    //console.log(postId);
    Post.deleteOne({ _id: postId, createdBy: req.userData.userId }).then((ret) => {
        //console.log(ret);
        if (ret.n > 0) {
            res.status(200).json({
                message: "Success",

            })
        }
        else {
            res.status(401).json({
                message: "Unauthorised Access!",

            })
        }
    })
    .catch(err=>{
        res.status(500).json({message:"Post Delete Failed!"})
    })
}

exports.updatePost = (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        createdBy: req.userData.userId
    });
    Post.updateOne({ _id: req.params.id, createdBy: post.createdBy }, post)
        .then((result) => {
            if (result.n > 0) {

                //console.log(result);
                res.status(200).json({
                    message: "Updated"
                })
            }
            else {

                //console.log(result);
                res.status(401).json({
                    message: "Unauthorised Access"
                })
            }
        })
        .catch(err=>{
            res.status(500).json({message:"Post Update Failed!"})
        })
}

exports.getPost = (req, res, next) => {

    Post.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            }
            else {
                res.status(404).json({
                    message: 'Post not Found!'
                })
            }
        }).catch(err=>{
            res.status(500).json({message:"Fetching Post Failed!"})
        })

}