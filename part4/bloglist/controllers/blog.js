const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const user = request.user
    const blog = new Blog({...request.body, user: user._id})
    blog.likes = blog.likes || 0
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
    const user = req.user
    const blog = await Blog.findById(req.params.id)

    if (!(user._id.toString() === blog.user.toString())){
        return res.status(401).json({ error: 'you are not authorized to delete requested blog' })
    }

    await blog.remove()
    //to-do: remove blog._id from user.blogs array
    //example code:
    //!!!PENDING TEST
    //user.blogs = user.blogs.filter( blog => blog.toString() != req.params.id )
    //await user.save()

    return res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    const user = req.user

    if (!(user._id.toString() === blog.user.toString())){
        return res.status(401).json({ error: 'you are not authorized to update requested blog' })
    }

    const returnedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.json(returnedBlog)
})

module.exports = blogRouter;
