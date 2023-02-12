import Button from "react-bootstrap/esm/Button"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom"

const Navigation = ({ user, handleLogout }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">users</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar className="justify-content-end">
        <Nav className="me-auto">
          <Navbar.Text>{user.name} logged in</Navbar.Text>
          <Nav.Link to="/">
            <Button variant="outline-dark" size="sm" onClick={handleLogout}>
              logout
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar>
    </Navbar>
  )
}

export default Navigation
