const {Schema, model} = require('mongoose');

const commentSchema = new Schema ({
    content:{
        type: String,
        required: true,
    },

    blogId:{
        type: Schema.Types.ObjectId,
        ref: 'Blog', // Reference to Blog model
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    }
},{ timestamps: true });


const Comment = model('Comment', commentSchema);

module.exports = Comment;