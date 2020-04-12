const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = function(req,res){
    console.log(req.body);
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user: req.user._id
            },function(err,comment){
                //handle error
                if(err){
                    console.log(err);return;
                }
                
    
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });   
        }
    });
}
    
module.exports.delete = function(req,res){
    console.log(req.query.id);
    let id=req.query.id;
    Post.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting');
            return;
        }
        return res.redirect('back');
    });
}