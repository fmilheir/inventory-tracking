const User = require("../models/User");

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
        if(e.errors)
        {
            console.log(e.errors);
            res.render('/join', {error : e.errors});
            return;
        }
        res.status(400).send({ message: "user error" });

    }

};