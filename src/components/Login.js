import React, { useState } from 'react';
import '../css/Login.css';
import {Card, Form, Row, Col} from 'react-bootstrap';
import Link from './Link';
import Button from './Button';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(email + ' ' + password)
    // TODO: connect with backend
  };

  return(

    <div>
      <div className="login-card">
        <Card border="">
          <Card.Header>
            <div className="header">
              Login
            </div>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={onFormSubmit}>
              <Form.Group as={Row}>
                <Col xl="2"></Col>
                <Col xl="8">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </Col>
                <Col></Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col xl="2"></Col>
                <Col xl="8">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <Link href="/">
                    Forgot your password?
                  </Link>
                </Col>
              </Form.Group>
              <Link>
                <Button
                  className="button dark login"
                  text="Login"
                  type="submit"
                  onClick={onFormSubmit}>
                </Button>
              </Link>

            </Form>

            <br></br>
            <Link href='/register'>
              <p>Don't have an account? Register</p>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>

  );

};

export default Login;
