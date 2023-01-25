import { func } from "prop-types"

describe('Blog app', async function(){
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
        username: 'testUser',
        password: 'password',
        name: 'testName'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const another_user = {
        username: 'secondUser',
        password: 'password',
        name: 'secondUser'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', another_user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function(){
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function(){
        cy.get('input:first').type('testUser')
        cy.get('input:last').type('password')
        cy.get('#login-button').click()

        cy.contains('testName logged in')
    })

    it('fails with wrong credentials', function(){
        cy.get('input:first').type('testUser')
        cy.get('input:last').type('wrongpassword')
        cy.get('#login-button').click()

        cy.get('.error').should('contain', 'Incorrect username or password')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3003/api/login', {
            username: 'testUser', password: 'password'
        }).then(response => {
            localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function(){
        cy.contains('new blog').click()
        cy.get('#title-input').type('blog title')
        cy.get('#author-input').type('blog author')
        cy.get('#url-input').type('blogurl.com')
        cy.get('#create-blog-button').click()

        cy.contains('blog title blog author')
    })

    it('User can like a blog', function(){
        cy.contains('new blog').click()
        cy.get('#title-input').type('blog title')
        cy.get('#author-input').type('blog author')
        cy.get('#url-input').type('blogurl.com')
        cy.get('#create-blog-button').click()

        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('likes 1')
    })

    it('User who created a blog can delete it', function(){
        cy.contains('new blog').click()
        cy.get('#title-input').type('blog title')
        cy.get('#author-input').type('blog author')
        cy.get('#url-input').type('blogurl.com')
        cy.get('#create-blog-button').click()

        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('window:confirm', () => true)
        cy.contains('blog title blog author').should('not.exist')
    })

    it('other users cannot delete the blog', function(){
        cy.contains('new blog').click()
        cy.get('#title-input').type('blog title')
        cy.get('#author-input').type('blog author')
        cy.get('#url-input').type('blogurl.com')
        cy.get('#create-blog-button').click()

        cy.contains('logout').click()
        cy.get('input:first').type('secondUser')
        cy.get('input:last').type('password')
        cy.get('#login-button').click()

        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
    })

    it('blogs are ordered according to likes with the blog with the most likes being first', function(){
        cy.contains('new blog').click()
        cy.get('#title-input').type('blog with second most likes')
        cy.get('#author-input').type('blog author')
        cy.get('#url-input').type('blogurl.com')
        cy.get('#create-blog-button').click()

        cy.contains('new blog').click()
        cy.get('#title-input').type('blog with most likes')
        cy.get('#author-input').type('another blog author')
        cy.get('#url-input').type('anotherblogurl.com')
        cy.get('#create-blog-button').click()

        cy.contains('blog with second most likes blog author').contains('view').click()
        cy.get('.like-button').click()
        cy.contains('hide').click()

        cy.contains('blog with most likes another blog author').contains('view').click()
        cy.get('.like-button').click()
        cy.get('.like-button').click()
        cy.get('.like-button').click()
        cy.contains('blog with second most likes blog author').contains('view').click()

        cy.get('.blog').eq(0).should('contain', 'blog with most likes')
        cy.get('.blog').eq(1).should('contain', 'blog with second most likes')
    })
  })
})
