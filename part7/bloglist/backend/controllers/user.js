const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
    //return all users in db
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
    return res.json(users)
})

userRouter.post('/', async (req, res) => {
    //create new user
    const { username, password, name } = req.body

    if (!username || !password){
        return res.status(400).json({
            error: "username and/or password must be at least 3 characters long"
        })
    }

    if (username.length < 3 || password.length < 3){
        return res.status(400).json({
            error: "username and/or password must be at least 3 characters long"
        })
    }

    const foundUser = await User.findOne({ username })

    if (foundUser){
        return res.status(400).json({
            error: "username must be unique"
        })
    }

    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

module.exports = userRouter
