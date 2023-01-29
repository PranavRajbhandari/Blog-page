import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js'

export const signin = async (req, res) => {
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({ email })
        // first we need to find old user(extistinguser)

        if(!existingUser) return res.status(404).json({ message:"User doesn't exist" })
        // no old user we cannot find it
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message : "Invalid credentials"})

        const token = jwt.sign({ email: existingUser.email, id:existingUser._id },'test', {expiresIn: "1h"})

        res.status(200).json({result: existingUser, token});

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}


export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } =req.body

    try {
        const existingUser = await User.findOne({ email })
        // first we need to find old user(extistinguser)

        if(existingUser) return res.status(400).json({ message:"User already exist" })
        // no old user we cannot find it

        if(password !== confirmPassword) return res.status(400).json({ message:"Password don't match." })
        
        const hashedPassword = await bcrypt.hash(password,12 );

        const result = await User.create({ email, password: hashedPassword, name:`${firstName}${lastName}` })

        // not to store in plain text(hashedPassword)
        const token = jwt.sign({ email: result.email, id:result._id },'test', {expiresIn: "1h"})


        res.status(200).json({ result, token});
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' })
    }
}