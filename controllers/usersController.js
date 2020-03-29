const User = require('../models/user')

module.exports.profile = function(req,res){
    res.render('user_profile',{
        title:"profile"
    });
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
    //To Do
}