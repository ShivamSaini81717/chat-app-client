import React, { useState,useContext } from 'react'
import { Col,Row, Container, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css"
import { useLoginUserMutation } from "../Services/appApi";
import { AppContext, socket } from "../context/appContext";
export const Login = () => {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    function handleLogin(e) {
      e.preventDefault();
      // login logic
      loginUser({ email, password }).then(({ data }) => {
          if (data) {
              // socket work
              socket.emit("new-user");
              // navigate to the chat
              navigate("/chat");
          }
      });
  }
  return (
    <Container>
    <Row>
        <Col md={5} className="login__bg"></Col>
        <Col md={7} className="d-flex align-items-center justify-center flex-direction-column">
    <Form style={{width:"80%", maxWidth:500}} onSubmit={handleLogin}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    {error && <p className="alert alert-danger">{error.data}</p>}
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
    
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
    </Form.Group>
   
    <Button variant="success" type="submit">
    {isLoading ? <Spinner animation="grow" /> : "Login"}
    </Button>
    <div className='py-4'>
        <p className='text-center'>
       Don't have An Account ?
    <Link to="/signup">Signup</Link>
        </p>
    </div>
  </Form>
  </Col>
    </Row>
  </Container>
  )
}
