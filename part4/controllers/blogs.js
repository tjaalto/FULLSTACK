const blogsRouter = require('express').Router()
require('express-async-errors')

const Blog = require('../models/blog')

blogsRouter.get('/', async (_, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { body } = request

    const { user } = request

    if (!user) {
        return response.status(401).json({ error: 'token is missing or invalid' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const { body } = request

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    const { user } = request

    if (user.blogs.includes(request.params.id)) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }

    response.status(403).end()
})

module.exports = blogsRouter
