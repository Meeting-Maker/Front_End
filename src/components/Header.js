import React, {useState, useEffect} from 'react';
import Link from '../router/Link';
import Button from './Button';
import '../css/Header.css';

const Header = () => {
//backgroundColor: "#45A29E",

  const [loggedIn, setLogginIn] = useState(false);

  useEffect(() => {
    console.log('logged in: ' + loggedIn);
  }, [loggedIn]);

  // TODO: modify login functionality
  return(
      <div className="ui borderless fixed inverted menu">
        <div className="ui container" style={{width: "100%"}}>

          <div className="header item">
            <Link href='/' className="no-hover">
              <h1 className="ui huge header">
                <div className="ui grid">
                  <div className="nine wide column" style={{padding: '0', color: "white"}}> meeting </div>
                  <div className="seven wide column" style={{padding: '0', color: "#45A29E"}}> maker </div>
                </div>
              </h1>
            </Link>
          </div>

          <div className="right item">
            {loggedIn
            ?
              <Button className="custom-button light">
                <div className="ui simple inverted dropdown ">
                  <div className="text"> Account </div>
                  <i className="dropdown icon"></i>
                  <div className="menu">
                      <Link href='/profile' className="item no-hover">
                        Profile
                      </Link>
                      <div
                        className="item no-hover"
                        onClick={(e) => setLogginIn(false)}>
                          Logout
                      </div>
                  </div>
                </div>
              </Button>
            :
              <Link href="/login">
                <Button
                  className="custom-button light"
                  onClick={(e) => setLogginIn(true)}
                  disabled="true">
                    Login
                </Button>
              </Link>
            }
          </div>
        </div>
      </div>
  );

}

export default Header;
