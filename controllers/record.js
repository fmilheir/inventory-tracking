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

exports.login = async(req, res) =>{
    res.render('login');
}

exports.signup = async(req, res) =>{
    res.render('signup');
}