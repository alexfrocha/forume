import express from 'express'
import { addAnswer, addComment, deslikeComment, getCommentsByPostId, getCommentsByUserId, likeComment, removeAnswer, removeComment } from '../controllers/comment.js'

const route = express.Router()
route.delete('/delete/:_id', removeComment)
route.post('/create', addComment)
route.post('/like', likeComment)
route.post('/deslike', deslikeComment)
route.get('/:postId', getCommentsByPostId)
route.post('/answer', addAnswer)
route.delete('/answer/delete/:answerId', removeAnswer)
route.get('/user/:userId', getCommentsByUserId)
export default route