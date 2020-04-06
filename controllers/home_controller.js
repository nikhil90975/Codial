const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req,res){
    
    Post.find({}).populate('user').exec(function(err,post_list){
        return res.render('home',{
            title:"Codial | Home",
            post_view:post_list
        });
    });
}

console.log('controller loaded');