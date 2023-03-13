import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    deslikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})


PostSchema.pre('remove', async function(next) {
    await this.model('Comment').deleteMany({ parentPost: this._id })
    next()
})

const Post = mongoose.model('Post', PostSchema)
export default Post