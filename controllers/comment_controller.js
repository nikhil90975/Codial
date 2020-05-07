const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');
const commentMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user','name email').execPopulate();
            
            // commentMailer.newComment(comment);
            
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('Error in creating a queue');return;
                }
                console.log(job.id);
            })
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment:comment
                    },
                    message: "Post created!"
                });
            }
        }
        return res.redirect('/');
    }catch(err){
        console.log(err);return;
    }
}



    
    
module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);
        console.log(comment,req.params.id);
        if(comment.user == req.user.id){
            console.log('its me');
            let postId = comment.post;
            comment.remove();
        
        let post = await Post.findByIdAndUpdate(postId,{ $pull:{comments: req.params.id}});
        //destroy associated likes
        await Like.deleteMany({likeable:comment._id,onModel: 'Comment' });
        if(req.xhr){
            return res.status(200).json({
                data: {
                    comment_id: req.params.id
                },
                message:"comment deleted"
            });
        }
        //destroy the associated likes
        await Like.deleteMany({likeable: comment._id,onModel: 'Comment'});
        }
        return res.redirect('back');
    }catch(err){
        console.log(err);
    }
}