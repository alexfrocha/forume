import Comment from "../model/Comment.js";
import Post from "../model/Post.js";
import User from "../model/User.js";


export const getCommentsByPostId = async (req, res) => {
    try {
        const {
            postId
        } = req.params
        const post = await Post.findById(postId)
        const comments = await Comment.find({ _id: { $in: post.comments }})
        const updatedComments = await Promise.all(comments.map(async comment => {
            const answers = await Comment.find({ _id: { $in: comment.comments }})
            const commentAuthor = await User.findOne({ _id: { $in: comment.author}} )
            comment.author = commentAuthor
            comment.parentPost = post
            const updatedAnswers = await Promise.all(answers.map(async answer => {
                const author = await User.findOne({ _id: { $in: answer.author }})
                answer.author = author
                return answer
            }))
            console.log(updatedAnswers)
            comment.comments = updatedAnswers
            return comment
        }))
        return res.status(200).json(updatedComments)
    } catch (err) { res.status(500).json({ error: err.message }) }
}

export const getCommentsByUserId = async (req, res) => {
    try {
        const {
            userId
        } = req.params
        const user = await User.findById(userId)
        const comments = await Comment.find({ author: user._id })
        const updatedComments = await Promise.all(comments.map(async comment => {
            const answers = await Comment.find({ _id: { $in: comment.comments }})
            const post = await Post.find({ _id: { $in: comment.parentPost }})
            comment.parentPost = post
            comment.comments = answers
            return comment
        }))
        return res.status(200).json(updatedComments)
    } catch (err) { res.status(500).json({ error: err.message }) }
}

export const addAnswer = async (req, res) => {
    try {
        const {
            commentId,
            content,
            userId
        } = req.body
        if(!content) return res.status(404).json({ errorMessage: 'Não tem conteúdo' })
        const comment = await Comment.findById(commentId)
        if(!comment) return res.status(404).json({ errorMessage: 'Id inválido '})
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({ errorMessage: 'Id inválido '})
        const answer = new Comment({
            parentPost: comment.parentPost,
            content,
            author: user._id
        })
        comment.comments.push(answer._id)
        Promise.all([comment.save(), answer.save()])
        res.status(200).json(answer)
    } catch (err) { res.status(500).json({ error: err.message }) }
}

export const removeAnswer = async (req, res) => {
    try {
        const {
            answerId
        } = req.params
        const answer = await Comment.findByIdAndDelete(answerId)
        if(!answer) return res.status(404).json({ errorMessage: 'Id inválido '})
        const comment = await Comment.findOne({ 'comments._id': answerId })
        if(!comment) return res.status(404).json({ errorMessage: 'Id inválido '})

        const answerIndex = comment.comments.indexOf(answerId)
        comment.comments.splice(answerIndex, 1)
        await comment.save()
        return res.status(200).json(answer)
    } catch (err) { res.status(500).json({ error: err.message}) }
}

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
        const comment = await Comment.findByIdAndDelete(_id)
        if(!comment) return res.status(404).json({ errorMessage: 'Id inválido '})
        const post = await Post.findById(comment.parentPost)
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
