import express from 'express'
const router = express.Router()
import { userSchema } from '../models/User.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import 'dotenv/config'


//@route POST api/auth/register
// @des Register user
// @access Pulbic

router.post('/register', async (req, res) => {
    const { username, password } = req.body


    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username and/or password' })
    }
    try {
        const checkUserName = await userSchema.findOne({ username })
        if (checkUserName) return res.status(400).json({ success: false, message: 'Username already taken' })

        const hashedPassword = await argon2.hash(password)
        const newUser = new userSchema({
            username,
            password: hashedPassword
        })
        await newUser.save()
        //return Token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACESS_TOKEN_SECRET)
        res.json({ success: true, message: 'User created succes', accessToken })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username and/or password' })
    }

    try {
        // Check for existing user

        const checkUserLogin = await userSchema.findOne({ username })
        if (!checkUserLogin) return res.status(400).json({ success: false, message: "Incorrect username or password" })
        // Username found
        const passwordValid = await argon2.verify(checkUserLogin.password, password)
        if (!passwordValid) return res.status(400).json({ success: false, message: "Incorrect username or password" })
        // ALl good
        //return Token
        const accessToken = jwt.sign({ userId: checkUserLogin._id }, process.env.ACESS_TOKEN_SECRET)
        res.json({ success: true, message: 'User logged successfully', accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }

})

export default router