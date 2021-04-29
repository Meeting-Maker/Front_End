import React, {useState} from 'react';
import {Card, Form, Row, Col} from 'react-bootstrap';
import Link from './Link';
import Button from './Button';
import '../css/Register.css';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');


  const onFormSubmit = (event) => {
    event.preventDefault();
    password === passwordVerify ?
      console.log(name + ' ' + email + ' ' + password) :
      console.log('failed register');
    // TODO: connect with backend
  };

  return (

    <div>
    <div className="register-card">
      <Card border="">
        <Card.Header>
          <div className="header">
            Register
          </div>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onFormSubmit}>

            <Form.Group as={Row}>
              <Col xl="2"></Col>
              <Col xl="8">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Col>
            </Form.Group>

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
                </Link>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col xl="2"></Col>
              <Col xl="8">
                <Form.Control
                  type="password"
                  placeholder="Verify Password"
                  value={passwordVerify}
                  onChange={e => setPasswordVerify(e.target.value)}
                />
                <Link href="/">
                </Link>
              </Col>
            </Form.Group>

            <Link>
              <Button
                className="button dark register"
                text="Register"
                type="submit"
                onClick={onFormSubmit}>
              </Button>
            </Link>

          </Form>

          <br></br>
          <Link href='/login'>
            <p>Already have an account? Login</p>
          </Link>
        </Card.Body>
      </Card>
    </div>
    </div>

  );

};

export default Register;