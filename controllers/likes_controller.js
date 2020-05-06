const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){
    try {
        console.log('i m here');
        //likes/toggle/id=abcd&type=Post;
        let likable;
        let deleted = false;

        if(req.query.type=='Post'){
            likable = await Post.findById(req.query.id).populate('likes');
        }else{
            likable = await Comment.findById(req.query.id).populate('likes');
        }
        console.log(likable);
        //check if like already exists

        let existingLike = await Like.findOne({
            likable: req.query.id,
            onModel: req.query.type,
            user:req.user._id
        });

        // if a like already exists then delete it
        if(existingLike){
            likable.likes.pull(existingLike._id);
            likable.save();

            existingLike.remove();
        }else{
            //make a new like
            let newLike = await Like.create({
                user: req.user._id,
                likable: req.query.id,
                onModel: req.query.type
            });

            likable.likes.push(newLike._id);
            likable.save();
            
        }

        return res.json(200,{
            message: "Request successful",
            data: {
                deleted: deleted
            }
        });

    } catch (error) {
        console.log(error);
        return res.json(500,{
            message: 'Internal Server Error'
        });
    }
}