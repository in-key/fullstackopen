const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Gangplank's Wet Dream",
        author: "Gangplank",
        url: "Magnumdong.com",
        likes: 5
    },
    {
        title: "Gangplank's Dry Dream",
        author: "Gangplank",
        url: "Magnumdong.com",
        likes: 1
    },
    {
        title: "Gangplank's wedding",
        author: "Gangplank",
        url: "Magnumdong.com",
        likes: 34
    }
]

const nonExistingId = async () => {
    const blog = new Blog({});
    await blog.save();
    await blog.remove();

    return blog._id.toString();
}

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map( blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }
