import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component', () => {
  let container
  let mockBlogs
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'mockTitle',
      author: 'mockAuthor',
      url: 'mockurl.com',
      likes: 6,
      user: {
        name: 'mockUser'
      }
    }

    container = render(<Blog blog={blog} blogs={mockBlogs} setBlogs={mockHandler}/>).container
  })

  test('renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
    const headingdiv = container.querySelector('.blogheading')
    expect(headingdiv).toBeDefined()
    const urldiv = container.querySelector('.blogurl')
    expect(urldiv).toBeNull()
    const likediv = container.querySelector('.bloglikes')
    expect(likediv).toBeNull()
  })

  test('shows blog\'s URL and number of likes when the button controlling the shown details has been clicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.visibilityButton')
    await user.click(button)
    const urldiv = container.querySelector('.blogurl')
    expect(urldiv).toBeDefined()
    const likediv = container.querySelector('.bloglikes')
    expect(likediv).toBeDefined()
  })

  test('calls the event handler the component received as props twice if the like button is clicked twice', async () => {
    const user = userEvent.setup()
    const visibilityButton = container.querySelector('.visibilityButton')
    await user.click(visibilityButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
