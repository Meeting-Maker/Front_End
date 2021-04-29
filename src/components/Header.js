import React, {useState, useEffect} from 'react';
import {Navbar, Container, Row, Col} from 'react-bootstrap';
import Link from '../router/Link';
import '../css/Header.css';

const Header = () => {
//backgroundColor: "#45A29E",

   const [loggedIn, setLogginIn] = useState(false);

   useEffect(() => {

   }, [loggedIn]);

   // TODO: modify login functionality

   return (
      <Navbar bg="dark">
         <Navbar.Brand>
            <Link href='/'>
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
            <Link href="/login">
               <button
                  className={`login-button ${loggedIn ? 'display-none' : ''}`}
                  onClick={(e) => setLogginIn(true)}>
                  Login
               </button>
            </Link>
         </Navbar.Collapse>

      </Navbar>

   );

}

export default Header;
