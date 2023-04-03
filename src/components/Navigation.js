import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer} from "react-router-bootstrap";
import {SiChatbot} from "react-icons/si"
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useLogoutUserMutation } from '../Services/appApi';

function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        window.location.replace("/");
    }
  return (
    <Navbar bg="success navbar-dark" expand="lg">
      <Container>
      <LinkContainer to="/">
      <Navbar.Brand>SAINI - Chat App <SiChatbot/> </Navbar.Brand>
      </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                        )}
         
          <LinkContainer to="/chat">
          <Nav.Link>Chat</Nav.Link>
          </LinkContainer>
           
          {user && (
                            <NavDropdown
                                title={
                                    <>
                                        <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} alt="user-pic" />
                                        {user.name}
                                    </>
                                }
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">Create Group</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>

                                <NavDropdown.Item>
                                    <Button variant="success" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
