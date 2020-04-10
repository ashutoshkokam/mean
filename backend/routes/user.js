const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {

        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then((data) => {
                res.status(201).json({
                    message: 'Registered Successfully',
                    user: data
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    })
});
router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then((user) => {
           
            if (!user) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            fetchedUser = user;
            //console.log(fetchedUser);
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            //console.log(result);
            if (!result) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
            //create token
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 
                "must_be_some_long_secret_key", 
                { expiresIn: "1h" });
                console.log(token);
                res.status(200).json({token:token,expiresIn:3600});
        })
        .catch(err => {
            //console.log(err);
            return res.status(401).json({
                message: 'Auth Failed'
            })
        })
})
module.exports = router;