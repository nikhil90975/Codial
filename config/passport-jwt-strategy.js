const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    //console.log("dgvff");
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codial'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    console.log("dgvff");
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from jwt');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            console.log('Error in finding user from jwt');
            return done(null,false);
        }
    });
}));
module.exports = passport;