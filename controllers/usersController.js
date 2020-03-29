const User = require('../models/user')

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                })
            }
        })
    }else {
        return res.redirect('/users/signin');
    }
}

module.exports.signup = function(req,res){
    res.render('Signup',{
        title: "signup"
    });
}
module.exports.signin = function(req,res){
    res.render('SignIn',{
        title: "signin"
    });
}

//get the signup data

module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up');return}

        if(!user){
            
            User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');return
                }
                return res.redirect('/users/signin');
            })
        }
        else{
            return res.redirect('back');
        }
    });
}


module.exports.createsession = function(req,res){
    //steps to authenticate
    //find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing in');return}
        //handle user fount
        if(user){
            //handle password which dont match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            
            //handle session crearion
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }else{
             //handle user not found
             return res.redirect('back');
        }
    });
}


module.exports.signout = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            
            if(user){
                console.log(user);
                res.clearCookie('user_id');
                return res.redirect('back');
            }
        });
    }
}