import bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import mongoose from 'mongoose'
import dontenv from 'dotenv'

import authRouter from './routes/auth.js'
import commentRouter from './routes/comment.js'
import postRouter from './routes/post.js'
import userRouter from './routes/user.js'
import { verifyToken } from './middleware/auth.js'


dontenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname + '/public/assets')))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })


app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/users', userRouter),
app.use('/comments', commentRouter)

const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`)))
.catch((err) => console.log(err))