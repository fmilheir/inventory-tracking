const express = require('express');
const main = require('../controllers/record');
const app = express();
const User = require('../controllers/user');
const Info = require('../controllers/info');



//the { expires: new Date(253402300000000) } } is the bigest expiration date in javascript


app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

//const authMiddleware = async (req, res, next) => {
 // const user = await User.findById(req.session.userID);
 // if (!user) {
  //  return res.redirect('/');
  //}
  ///next()
//}

const router = express.Router();
//pages and forms before loggin
router.get('/',main.homepage);
router.get('/About',main.About);
router.get('/pricing', main.pricing);

router.get('/login',User.login);
router.get('/signup',User.signup);

router.post('/signup',User.create);
router.post('/login',User.enter);

router.get('/logout',User.logout);

//change layout using the headers for the loggedin user
router.use(function(req, res, next){
    res.locals.layout = './common/main_login';
    next();
});
//only methods that uses this new header
router.get('/view_graphics', Info.graphic);
router.get('/vizualization',Info.test);
router.get('/add',Info.add);
router.post('/add', Info.addOnPost)
router.get("/add/delete/:id", Info.delete);
router.get("/add/edit/:id", Info.edit);
router.post("/add/edit/:id", Info.update);


//logout reduirect to mane page and destrys the session, but mine is not working so is basicly just sending me to the index page
router.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})


module.exports = router;
