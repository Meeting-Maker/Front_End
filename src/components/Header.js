import React, {useState, useEffect} from 'react';
import {Navbar, Container, Row, Col} from 'react-bootstrap';
import Link from '../router/Link';
import Button from './Button';
import '../css/Header.css';

const Header = () => {
//backgroundColor: "#45A29E",

  const [loggedIn, setLogginIn] = useState(false);

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);

  // TODO: modify login functionality

  return(

    <Navbar bg="dark" >
      <Navbar.Brand>
        <Link href='/' className="no-hover">
          <div className="title">
            <h1>
              <Container>
                <Row>
                  <Col style={{padding: '0', color: "white"}}> meeting </Col>
                  <Col style={{padding: '0', color: "#45A29E"}}> maker </Col>
                </Row>
              </Container>
            </h1>
          </div>
        </Link>
      </Navbar.Brand>

      <Navbar.Collapse className="justify-content-end">

        {loggedIn ?
          <Button
            className="custom-button light"

            onClick={(e) => setLogginIn(false)}>
              Logout

          </Button>
        :
          <Link href="/login">
            <Button
              className="custom-button light"
              onClick={(e) => setLogginIn(true)}>
                Login
            </Button>
          </Link>
        }
      </Navbar.Collapse>

    </Navbar>

  );

}

export default Header;
