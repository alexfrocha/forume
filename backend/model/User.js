import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
        default: ''
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
})

UserSchema.pre('remove', async function(next) {
    await this.model('Post').deleteMany({ author: this._id })
    next()
})

const User = mongoose.model("User", UserSchema);
export default User