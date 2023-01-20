require('../models/database');
const User = require("../models/User");
const bcrypt = require('bcrypt');


exports.create = async (req, res) =>
{
    try
    {
        const login = new User({ email: req.body.email, password: req.body.password});

        await login.save();
        res.redirect('/?message=taster has been created')
        console.log('authenticated');
    }
    catch(e)
    {
        console.log("error: ---")
        console.log(e);
        if (e.error || e.errors) {
            console.log("mongoose error");
            res.render('signup', { _pageName: "register", errors: e.error || e.errors || e.MongoError})
            return;
        }
        else if((e.name==='MongoError' || e.name ==='MongoServerError') && e.code === 11000 )
        {
            res.render('signup', { _pageName: "register", errors: {message: "Duplicate Email Error"}})
            return;
        }
    }
}

exports.enter = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email});

        if (!user) {
            res.render('login', { _pageName: "login", errors: { message: 'Email not found' }, message: null })
            return;
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.redirect('/vizualization');
            return;
        }

        res.render('login', { _pageName: "login", errors: { message: 'Incorrect Password' }, message: null })


    } catch (e) {
        console.log("Error");
        console.log(e);
        return res.status(400).send({
            message: JSON.stringify(e),
        });
    }
}


exports.login = async(req, res) =>{
    try {
        res.render('login', {title: 'Login', errors: {}});
    } 
    catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
    }  
}
exports.signup = async(req, res) =>{
    try {
        res.render('signup', {title: 'Sign Up', errors: {}});
    } 
    catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
    }
}
exports.logout = async(req, res) =>{
    try {
        req.session.destroy();
        global.user = false;
        res.redirect('/login');
    } 
    catch (error) {
        res.satus(500).send({message: error.message || "Error Occured" });
    }
}