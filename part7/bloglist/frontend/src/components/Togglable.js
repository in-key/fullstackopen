import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  Togglable.displayName = 'Togglable'

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {React.cloneElement(props.children, { toggleVisibility: toggleVisibility })}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
}

export default Togglable
