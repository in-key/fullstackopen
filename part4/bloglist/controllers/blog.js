const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const user = await User.findOne({})

    console.log(user)

    const blog = new Blog({...request.body, user: user._id})

    blog.likes = blog.likes || 0

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
    const id = req.params.id

    await Blog.findByIdAndDelete(id)

    res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
    const id = req.params.id

    const returnedBlog = await Blog.findByIdAndUpdate(id, req.body, {new: true})

    res.json(returnedBlog)
})

module.exports = blogRouter;
