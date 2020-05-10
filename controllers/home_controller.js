const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const Friends = require('../models/friendship');

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
    //let friends = await Friends.find({});
    let users = await User.find({}).populate('friendship');

    return res.render('home',{
        title:"Codial | Home",
        post_view:post_list,
        all_users:users,
        friends:users.friendship
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


