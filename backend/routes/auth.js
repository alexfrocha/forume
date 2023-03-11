import express from 'express'
import { createAccount, loginAccount } from '../controllers/auth.js'

const route = express.Router()
route.post('/create', createAccount)
route.post('/login', loginAccount)
export default route