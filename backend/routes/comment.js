import express from 'express'
import { addComment, deslikeComment, likeComment, removeComment } from '../controllers/comment.js'

const route = express.Router()
route.delete('/delete/:_id', removeComment)
route.post('/create', addComment)
route.post('/like', likeComment)
route.post('/deslike', deslikeComment)
export default route