import React, {useState, useEffect} from 'react';
import Link from '../router/Link';
import Button from './Button';

const Header = () => {
//backgroundColor: "#45A29E",

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
  }, [loggedIn]);

  // TODO: modify login functionality
  return(
      <div className="ui borderless inverted menu" style={{borderRadius: "0"}}>
        <div className="ui container" style={{width: "100%", padding: "0"}}>

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
                        onClick={(e) => setLoggedIn(false)}>
                          Logout
                      </div>
                  </div>
                </div>
              </Button>
            :
              <Link href="/login">
                <Button
                  className="custom-button light"
                  onClick={(e) => setLoggedIn(true)}
                  disabled>
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
