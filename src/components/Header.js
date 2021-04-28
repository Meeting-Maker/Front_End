import React, {useState, useEffect} from 'react';
import {Navbar} from 'react-bootstrap';
import Link from './Link';
import '../css/Header.css';

const Header = (props) => {
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
              <a style={{color: "white"}}>meeting</a>
              <a style={{color: "#45A29E"}}>maker</a>
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
