import React, {useState, useEffect} from 'react';
import {Navbar} from 'react-bootstrap';
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
        <Link href='/'>
          <div className="title">
            <h1>
              <div style={{color: "white", display: 'inline'}}>meeting</div>
              <div style={{color: "#45A29E", display: 'inline'}}>maker</div>
            </h1>
          </div>
        </Link>
      </Navbar.Brand>

      <Navbar.Collapse className="justify-content-end">

        {loggedIn ?
          <Button
            className="button light"
            onClick={(e) => setLogginIn(false)}
            text="Logout">
          </Button>
        :
          <Link href="/login">
            <Button
              className="button light"
              onClick={(e) => setLogginIn(true)}
              text="Login">
            </Button>
          </Link>
        }
      </Navbar.Collapse>

    </Navbar>

  );

}

export default Header;
