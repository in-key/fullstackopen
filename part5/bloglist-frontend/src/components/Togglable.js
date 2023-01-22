import { useState } from "react"

const Togglable = (props) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false)

    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={() => setBlogFormVisible(true)}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={() => setBlogFormVisible(false)}>cancel</button>
            </div>
        </>
    )
}

export default Togglable
