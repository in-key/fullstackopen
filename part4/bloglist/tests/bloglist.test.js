const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('test blog routes', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});

        for (let blog of helper.initialBlogs){
            let blogObj = new Blog(blog);
            await blogObj.save()
        }
    })

    test('HTTP GET request to the /api/blogs return the correct amount of blogs', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = await api.get('/api/blogs');

        expect(blogs.body).toHaveLength(helper.initialBlogs.length);
    })

    test('The unique identifier property of the blog posts is named id', async () => {
        const res = await api.get('/api/blogs');

        expect(res.body[0].id).toBeDefined();
    })

    test('HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
        const newBlog = {
            title: "Miss Fortune's Inside Scoop",
            author: "Miss Fortune",
            url: "Misfortune.com",
            likes: 9000
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain("Miss Fortune's Inside Scoop")
    })

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            title: "Miss Fortune's Inside Scoop",
            author: "Miss Fortune",
            url: "Misfortune.com"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const createdBlog = response.body.find( blog => blog.title === "Miss Fortune's Inside Scoop" );

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(createdBlog.likes).toBe(0);
    })

    test('if the title or url properties are missing from the request data, the backend responds with the status code 400 Bad Request', async () => {
        const blogWithoutTitle = {
            author: "Miss Fortune",
            url: "Misfortune.com",
            likes: 9000
        }

        const blogWithoutUrl = {
            title: "Miss Fortune's Inside Scoop",
            author: "Miss Fortune",
            likes: 9000
        }

        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(blogWithoutUrl)
            .expect(400)
    })

    test('deleting a single blog post resource works', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map( b => b.title )

        expect(titles).not.toContain(blogToDelete.title)
    })

    test('updating the number of likes of an existing blog works', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: 60 })
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const returnedBlog = blogsAtEnd.find(blog => blog.title === blogToUpdate.title)

        expect(returnedBlog.likes).toBe(60)
    })
})

describe('test user routes', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('magnum', 10)
        const user = new User({ username: 'test', passwordHash })

        await user.save()
    })

    test('users with username shorter than 3 characters are not created', async () => {
        const user = {
            username: "2b",
            password: "password"
        }

        const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain("username and/or password must be at least 3 characters long")

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toHaveLength(1)
    })

    test('users with password shorter than 3 characters are not created', async () => {
        const user = {
            username: "3cc",
            password: "pw"
        }

        const result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain("username and/or password must be at least 3 characters long")

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toHaveLength(1)
    })

    test('users with no username or password are not created', async () => {
        let user = {
            password: "password"
        }

        let result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain("username and/or password must be at least 3 characters long")

        user = {
            username: "3cc"
        }

        result = await api
            .post('/api/users')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain("username and/or password must be at least 3 characters long")

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toHaveLength(1)
    })
})

afterAll(() => {
    mongoose.connection.close();
})
