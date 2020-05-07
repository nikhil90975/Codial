const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports.home = async function(req,res){

    try{
        //nested prepopulating
        let post_list = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path:'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');
    let users = await User.find({});


    return res.render('home',{
        title:"Codial | Home",
        post_view:post_list,
        all_users:users
    });
    }catch(err){
        console.log("Error",err);
    }  
}

console.log('controller loaded');


//using then
//Post.find({}).populate('comments').then(function());

//promises
//let posts = Post.find({}).populate('comments').exec();

//posts.then()


