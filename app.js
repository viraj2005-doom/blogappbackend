require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog');
const cookieparser = require('cookie-parser');
const { checkforauth } = require('./middlewares/auth');
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGODB_URI).then(e => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log("Error connecting to MongoDB", err);
});

//middlewares
app.use(express.urlencoded({ extended: false })); //form data ne parse karva mate
app.use(cookieparser()); //cookies ne parse karva mate
app.use(express.json());//json data ne parse karva mate
app.use(express.static(path.resolve('./public'))); //static files serve karva mate


//view engine setup
app.set('view engine', 'ejs'); //ejs atle embedded javascript templating engine , pug engine y aave ne handlebars pan
app.set('views', path.resolve('./views')); //views folder ni location specify kari

//routes

app.use('/user', userRoute);
app.use('/blog', blogRoute);


app.get('/', checkforauth('token'), async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin')
    }
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 }).populate('createdBy', 'username');
    return res.render("home.ejs", { user: req.user, blogs: allBlogs, error: null });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});