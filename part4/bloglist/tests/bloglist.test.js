const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { route } = require('../app')

describe('test blog routes', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("password", 10)
        const user = new User({
            username: "testUsername",
            name: "testName",
            passwordHash: passwordHash
        })

        await user.save()

        await Blog.deleteMany({});

        for (let blog of helper.initialBlogs){
            let blogObj = new Blog(blog);
            blogObj.user = user._id
            await blogObj.save()
            user.blogs = user.blogs.concat(blogObj._id)
            await user.save()
        }
    })

    test('HTTP GET request to the /api/blogs return the correct amount of blogs', async () => {
        const userResponse = await api
                        .post('/api/login')
                        .send({ username: 'testUsername', password: 'password'})

        const blogs = await api
            .get('/api/blogs')
            .set({ "Authorization": `bearer ${userResponse.body.token}`})
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(blogs.body).toHaveLength(helper.initialBlogs.length);
    })

    test('The unique identifier property of the blog posts is named id', async () => {
        const userResponse = await api
            .post('/api/login')
            .send({ username: 'testUsername', password: 'password'})

        const res = await api
                    .get('/api/blogs')
                    .set({ "Authorization": `bearer ${userResponse.body.token}`})

        expect(res.body[0].id).toBeDefined();
    })

    test('HTTP POST request to the /api/blogs URL successfully creates a new blog post', async () => {
        const userResponse = await api
            .post('/api/login')
            .send({ username: 'testUsername', password: 'password'})

        const newBlog = {
            title: "Miss Fortune's Inside Scoop",
            author: "Miss Fortune",
            url: "Misfortune.com",
            likes: 9000
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ "Authorization": `bearer ${userResponse.body.token}`})
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
                        .get('/api/blogs')
                        .set({ "Authorization": `bearer ${userResponse.body.token}`})

        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain("Miss Fortune's Inside Scoop")
    })

    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const userResponse = await api
            .post('/api/login')
            .send({ username: 'testUsername', password: 'password'})

        const newBlog = {
            title: "Miss Fortune's Inside Scoop",
            author: "Miss Fortune",
            url: "Misfortune.com"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ "Authorization": `bearer ${userResponse.body.token}`})
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api
            .get('/api/blogs')
            .set({ "Authorization": `bearer ${userResponse.body.token}`})

        const createdBlog = response.body.find( blog => blog.title === "Miss Fortune's Inside Scoop" );

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(createdBlog.likes).toBe(0);
    })

    test('if the title or url properties are missing from the request data, the backend responds with the status code 400 Bad Request', async () => {
        const userResponse = await api
            .post('/api/login')
            .send({ username: 'testUsername', password: 'password'})

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
            .set({ "Authorization": `bearer ${userResponse.body.token}`})
            .expect(400)

        await api
            .post('/api/blogs')
            .send(blogWithoutUrl)
            .set({ "Authorization": `bearer ${userResponse.body.token}`})
            .expect(400)
    })

    test('deleting a single blog post resource works', async () => {
        const userResponse = await api
            .post('/api/login')
            .send({ username: 'testUsername', password: 'password'})

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set({ "Authorization": `bearer ${userResponse.body.token}`})
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map( b => b.title )

        expect(titles).not.toContain(blogToDelete.title)
    })

    test('updating the number of likes of an existing blog works', async () => {
        const userResponse = await api
            .post('/api/login')
            .send({ username: 'testUsername', password: 'password'})

        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: 60 })
            .set({ "Authorization": `bearer ${userResponse.body.token}`})
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        const returnedBlog = blogsAtEnd.find(blog => blog.title === blogToUpdate.title)

        expect(returnedBlog.likes).toBe(60)
    })
})

describe('test user routes', () => {
    beforeEach(async () => {
        // await User.deleteMany({})

        // const passwordHash = await bcrypt.hash('magnum', 10)
        // const user = new User({ username: 'test', passwordHash })

        // await user.save()
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash("password", 10)
        const user = new User({
            username: "testUsername",
            name: "testName",
            passwordHash: passwordHash
        })

        await user.save()

        await Blog.deleteMany({});

        for (let blog of helper.initialBlogs){
            let blogObj = new Blog(blog);
            blogObj.user = user._id
            await blogObj.save()
            user.blogs = user.blogs.concat(blogObj._id)
            await user.save()
        }
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
