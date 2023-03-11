import express from 'express'
import { addPost, deslikePost, getPosts, getPostsByProfile, likePost, removePost } from '../controllers/post.js'

const route = express.Router()
route.get('/', getPosts)
route.get('/:_id', getPostsByProfile)
route.post('/create', addPost)
route.delete('/delete/:_id', removePost)
route.post('/like', likePost)
route.post('/deslike', deslikePost)
export default route