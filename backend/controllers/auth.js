import User from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createAccount = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body


        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        })


        const createdUser = await newUser.save()
        res.status(200).json(createdUser)
    } catch (err) { res.status(500).json({ error: err.message })}
}

export const loginAccount = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body
    
        const someUserWithSameEmail = await User.findOne({ email })
        if(!someUserWithSameEmail) return res.status(404).json({ errorMessage: 'Usuário não encontrado' })
        if(!bcrypt.compare(password, someUserWithSameEmail.password)) return res.status(404).json({ errorMessage: 'Senha inválida' })
        const token = jwt.sign({ id: someUserWithSameEmail.id }, process.env.JWT_SECRET)
        delete someUserWithSameEmail.password
        res.status(200).json({ token, someUserWithSameEmail })
    } catch (err) { res.status(500).json({ error: err.message })}
}