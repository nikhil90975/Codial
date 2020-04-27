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
module.exports.destroy = async function(req,res){
    try{
        console.log(req.params.id);
let post = await Post.findById(req.params.id);
console.log(post);
console.log(req.user);
if(post.user == req.user.id){
    post.remove();

    await Comment.deleteMany({post: req.params._id});

    if(req.xhr){
        return res.status(200).json({
            data: {
                post_id: req.params.id
            },
            message:"Post deleted"
        });
    }
    req.flash('success','Post and associated comment deleted');
    return res.redirect('back');
    }else{
        req.flash('error','You cannot delete this post');
        return res.redirect('back');
    }
}
        catch(err){
        console.log(err);
        return res.redirect('back');
    }
}