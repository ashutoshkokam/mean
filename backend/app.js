const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');


const app = express();
//rrHBFZBZLouDAGSo
//app db connection
mongoose
    .connect("mongodb+srv://master:rrHBFZBZLouDAGSo@cluster0-2xvlb.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to DB');
    })
    .catch(() => {
        console.log('Connection Failed');
    })

//adding middlewares to parsebody/URI
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS Enabled
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    next();
});

app.use('/api/posts',postRoutes);
app.use('/api/user',userRoutes);

module.exports = app;