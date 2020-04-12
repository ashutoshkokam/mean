const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');


const app = express();
//rrHBFZBZLouDAGSo
//app db connection
//?retryWrites=true&w=majority
//

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
mongoose
    .connect(`mongodb+srv://master:${process.env.MONGO_ATLAS_PWD}@cluster0-2xvlb.mongodb.net/node-angular`,
    options)
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