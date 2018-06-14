var express = require('express');
var passport = require('passport');
var asysncss = require('express-async-await');
//var router = express.Router();
var router = asysncss(express.Router()) ;
var index = require('../controllers/index');

router.get('/', index.index);
router.get('/success', index.success);
router.get('/fail', index.fail);


router.get('/user', isLoggedIn ,  index.user);


router.post('/login', passport.authenticate('chat-login', {
  successRedirect : '/success',
  failureRedirect : '/fail',
  failureFlash: true
}));


//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated() )
	{
        return next();
    }
    else
	{
        res.redirect('/');
    }
}



module.exports = router;