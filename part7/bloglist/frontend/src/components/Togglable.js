import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "react-bootstrap/esm/Button"

const Togglable = (props) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? "none" : "" }
  const showWhenVisible = { display: blogFormVisible ? "" : "none" }

  const toggleVisibility = () => {
    setBlogFormVisible(!blogFormVisible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  Togglable.displayName = "Togglable"

  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant="outline-primary" size="sm" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {React.cloneElement(props.children, {
          toggleVisibility: toggleVisibility,
        })}
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </>
  )
}

export default Togglable
