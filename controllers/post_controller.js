const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post created!"
            });
        }
        req.flash('success','Post Published')
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return;
    }
}
module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params._id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back')
        }
    });
}