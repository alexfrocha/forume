import Comment from "../model/Comment.js";
import Post from "../model/Post.js";
import User from "../model/User.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().lean().exec()
        const updatePost = await Promise.all(posts.map(async post => {
            const comments = await Comment.find({ _id: {$in: post.comments }}).lean().exec()
            const user = await User.findOne({ _id: {$in: post.author}})
            post.comments = comments
            post.author = user
            return post
        }))
        res.status(200).json(updatePost)
    } catch (err) { res.status(500).json({ error: err.message }) }
}

export const getPost = async (req, res) => {
    try {
        const { _id } = req.params
        const post = await Post.findById(_id).lean().exec()
        if(!post) return res.status(404).json({ errorMessage: 'Post não encontrado' })
        const user = await User.findOne({ _id: {$in: post.author}})
        const comments = await Comment.findOne({ _id: {$in: post.comments}})
        if(user) post.author = user
        if(comments) post.comments = comments
        res.status(200).json(post)
    } catch (err) { res.status(500).json({ error: err.message}) }
}

export const getPostsByProfile = async (req, res) => {
    try {
        const { _id } = req.params
        const posts = await Post.find({ author: _id }).lean().exec()
        const comments = await Comment.find({ _id : { $in: posts.comments } }).lean().exec()
        posts.comments = comments
        res.status(200).json(posts)
    } catch (err) { res.status(500).json({ error: err.message }) }
}

export const addPost = async (req, res) => {
    try {
        const {
            title,
            content,
            userId
        } = req.body

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({ errorMessage: 'Usuário não encontrado' })
        const post = new Post({
            title,
            content,
            author: user._id
        })
        user.posts.push(post._id)
        Promise.all([post.save(), user.save()])
        res.status(200).json(post)
    } catch (err) { res.status(500).json({ error: err.message }) }
}

export const removePost = async (req, res) => {
    try {
        const { _id } = req.params
        const { userId } = req.body
        const post = await Post.findByIdAndDelete(_id);
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({ error: 'Usuário não encontrado' })
        const postIndex = user.posts.indexOf(post._id)
        user.posts.splice(postIndex, 1)
        Promise.all([user.save()])
        return res.status(200).json(post)
    } catch (err) { res.status(500).json({ error: err.message}) }
}

export const likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body
        const post = await Post.findById(postId);
        const user = await User.findById(userId);
        if(!post || !user) return res.status(404).json({ errorMessage: 'Usuário/Post não encontrado' })
        const indexLikes = post.likes.indexOf(user._id)
        const indexDeslikes = post.deslikes.indexOf(user._id)
        if(post.likes.includes(user._id)) {
            post.likes.splice(indexLikes, 1)
            await post.save()
            return res.status(200).json(post)
        }
        post.likes.push(user._id)
        post.deslikes.splice(indexDeslikes, 1)
        await post.save()
        return res.status(200).json(post)
    } catch (err) { res.status(500).json({ error: err.message }) }
}

export const deslikePost = async (req, res) => {
    try {
        const { postId, userId } = req.body
        const post = await Post.findById(postId);
        const user = await User.findById(userId);
        if(!post || !user) return res.status(404).json({ errorMessage: 'Usuário/Post não encontrado' })
        const indexLikes = post.likes.indexOf(user._id)
        const indexDeslikes = post.deslikes.indexOf(user._id)
        if(post.deslikes.includes(user._id)) {
            post.deslikes.splice(indexDeslikes, 1)
            await post.save()
            return res.status(200).json(post)
        }
        post.likes.splice(indexLikes, 1)
        post.deslikes.push(user._id)
        await post.save()
        return res.status(200).json(post)
    } catch (err) { res.status(500).json({ error: err.message }) }
}