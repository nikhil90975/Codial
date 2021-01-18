const mongoose = require('mongoose');
//sfsdgsdghejrgbgehjrghjsdfvb
const postSchema = new mongoose.Schema({
    content: {
        type:String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: new Date()
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post;
