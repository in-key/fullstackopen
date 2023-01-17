const blogRouter = require('express').Router();
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    blog.likes = blog.likes || 0

    const result = await blog.save()

    response.status(201).json(result)
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
