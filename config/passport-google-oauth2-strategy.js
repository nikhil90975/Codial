const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: "263040284202-mts9ltggoa4rnurm1qbka5vt2kukvt61.apps.googleusercontent.com",
    clientSecret: "DrWXaViUlqWr6naMR5TI3Fth",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy-passport',err);
            return;
        }
        console.log(profile);

        if(user){
            //if found set this user as req.user
            return done(null,user);
        }else{
            //if not found ,create the user and set it as req.user
            User.create({
                name:profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error in creating user',err);
                    return;
                }
                return done(null,user);
            })
        }
    })
}
));