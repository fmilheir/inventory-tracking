require('../models/database');

// GET the homepage 
exports.homepage = async(req, res) =>{
    res.render('index');
}

exports.About = async(req, res) =>{
    res.render('About');
}

exports.pricing = async(req, res) =>{
    res.render('pricing');
}


