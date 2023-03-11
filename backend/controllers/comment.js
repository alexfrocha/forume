import Comment from "../model/Comment.js";
import Post from "../model/Post.js";
import User from "../model/User.js";

export const addComment = async (req, res) => {
    try {
        const { 
            postId,
            content,
            userId
        } = req.body

        const user = await User.findById(userId)
        const post = await Post.findById(postId)

        if(!user || !post) return res.status(404).render('Usuário / Post não encontrado')

        const newComment = new Comment({
            parentPost: post._id,
            content,
            author: user._id
        })

        post.comments.push(newComment)
        await post.save()
        const savedComment = await newComment.save()        
        return res.status(200).json(savedComment)
    } catch (err) { res.status(500).json({ error: err.message }) }
}

export const removeComment = async (req, res) => {
    try {
        const {
            _id
        } = req.params
        const comment = await Comment.findById(_id)
        if(!comment) return res.status(404).json({ errorMessage: 'Id inválido '})
        const post = await Post.findByIdAndDelete(comment.parentPost)
        const commentIndex = post.comments.indexOf(comment._id)
        post.comments.splice(commentIndex, 1)
        await post.save()
        return res.status(200).json(comment)
    } catch (err) { res.status(500).json({ error: err.message }) }
}

export const likeComment = async (req, res) => {
    try {
        const {
            commentId,
            userId
        } = req.body

        const comment = await Comment.findById(commentId)
        const user = await User.findById(userId)


        if(!comment || !user) return res.status(404).json({ errorMessage: 'Usuário/Comentário não encontrado'})
        const indexLikes = comment.likes.indexOf(user._id)
        const indexDeslikes = comment.deslikes.indexOf(user._id)
        if(comment.likes.includes(user._id)) {
            comment.likes.splice(indexLikes, 1)
            await comment.save()
            return res.status(200).json(comment)
        }
        comment.likes.push(user._id)
        comment.deslikes.splice(indexDeslikes, 1)
        await comment.save()
        return res.status(200).json(comment)
    } catch (err) { res.status(500).json({ error: err.message }) }
}


export const deslikeComment = async (req, res) => {
    try {
        const {
            commentId,
            userId
        } = req.body

        const comment = await Comment.findById(commentId)
        const user = await User.findById(userId)
        if(!comment || !user) return res.status(404).json({ errorMessage: 'Usuário/Comentário não encontrado'})
        const indexLikes = comment.likes.indexOf(user._id)
        const indexDeslikes = comment.deslikes.indexOf(user._id)
        if(comment.deslikes.includes(user._id)) {
            comment.deslikes.splice(indexDeslikes, 1)
            await comment.save()
            return res.status(200).json(comment)
        }
        comment.likes.splice(indexLikes, 1)
        comment.deslikes.push(user._id)
        await comment.save()
        return res.status(200).json(comment)
    } catch (err) { res.status(500).json({ error: err.message }) }
}
