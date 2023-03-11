import User from "../model/User.js";
import Post from "../model/Post.js";

export const getUser = async (req, res) => {
    try {
        const { _id } = req.params
        const user = await User.findById(_id).lean().exec()
        if(!user) return res.status(404).json({ errorMessage: 'Usuário não encontrado' })

        const posts = await Post.find({ _id: { $in: user.posts } }).lean().exec()
        user.posts = posts

        return res.status(200).json(user)
    } catch (err) { res.status(500).json({ error: err.message}) }
}