var LocalStrategy    = require('passport-local').Strategy;
var User = require('./models/User').User;

module.exports = function(passport) {
	
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if(user != null) done(err, user);
            else {
                User.findById(id, function(err, admin){
                    if(admin != null) done(err, admin);
                })
            }
        });
    });


    passport.use('chat-login', new LocalStrategy({
    
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password = '123456789', done) {
        if (email)
            email = email.toLowerCase(); 
        process.nextTick(function() {
            User.findOne({ 'email' :  email }, function(err, user) {
              
                if (err)
                    return done(err);
				
                if (!user)
                    return done(null, false, req.flash('error', 'No user found.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('error', 'Oops! Wrong password.'));

                else
                    return done(null, user);
            });
        });

    }));

};