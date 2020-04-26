const User = require('../models/user');
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'User Profile',
            profile_user: user
        });
    });
}

module.exports.update = function(req,res){
    console.log('here i m');
    if(req.user.id == req.params.id){
        console.log(req.body);
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            console.log(req.body);
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('unauthorised');
    }
}

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('Signup',{
        title: "signup"
    });
}
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
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

//sign out
module.exports.destroySession = function(req,res){
    //passport function...logout()
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/')
}
module.exports.createsession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}