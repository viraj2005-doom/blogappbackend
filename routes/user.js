const { Router} = require('express');
//const multer = require('multer');
const User = require('../models/user');
// const Blog = require('../models/blog');
const path = require('path');
const router = Router();


router.get('/', async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    return res.render('home.ejs', {
        user: req.user,  // Pass user to view
        blogs: blogs
    });
});

router.get('/signin', (req,res) => {
    const returnTo = req.query.returnTo || '/'; // Get the returnTo query parameter why? to redirect to original page after signin
    return res.render('signin.ejs', {error: null, returnTo: returnTo});
})

router.get('/signup', (req,res) => {
    return res.render('signup.ejs', {error: null});
})

router.get('/signout', (req,res) => {
    res.clearCookie('token');
    return res.redirect('/user/signin');
});

router.post('/signup', async (req,res) => {
    //signup logic
    const { fullName , email, password} = req.body;

    await User.create({
        firstName: fullName,
        email: email,
        password: password,
    });
    return res.redirect('/');
})

router.post('/signin', async (req,res) => {
    const { email, password, returnTo } = req.body;
    try {
        const token = await User.matchPasswordandgenerateToken(email, password);
        
        if(!token) {
            return res.render('signin.ejs', {error: "Invalid credentials", returnTo: returnTo || '/'});
        }

        //set cookie
        res.cookie('token', token, { httpOnly: true });
        
        // Redirect to original page or home
        return res.redirect(returnTo || '/');
    }
    catch(error) {
        console.log("Error during sign in", error);
        return res.render('signin.ejs', {error: "An error occurred during sign in", returnTo: returnTo || '/'});
    }
})

module.exports = router;