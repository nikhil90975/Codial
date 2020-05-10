const User = require('../models/user');
const Friend = require('../models/friendship');

module.exports.create = async function(req,res){
    try {
        
        let userr = await User.findById(req.user.id);
        console.log(userr);
        if(userr){
            let existing
            let friend = await Friend.findById(req.params.id);
            console.log(friend);
            if(friend){
                return res.redirect('back');
            }else{
                let newfriend = await Friend.create({
                    from_user: req.user.id,
                    to_user: req.params.id
                });
                friend = await userr.friendship.push(req.params.id);
                userr.save();
            }
        }
        
        //console.log(userr.friendship);
        
        //console.log(userr);
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}