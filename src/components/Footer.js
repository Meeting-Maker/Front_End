import React from 'react';
import {Navbar} from 'react-bootstrap';
import '../css/Footer.css';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';
import Link from './Link';

const Footer = () => {

  return (

    <div className="ui inverted vertical footer segment" style={{bottom: "0", position: "absolute", width:"100%"}}>
        <div className="ui container" style={{width: "100%"}}>
          <div className="footer-text ui grid">

            <div className="one wide column">
              <Icon path={mdiGithub} size={2}/>
            </div>
            <div className="seven wide right aligned column">
              <Link href="/" className="no-hover">
                Contact Us
              </Link>
            </div>
            <div className="eight wide column">
              <Link href="/" className="no-hover">
                Report a Bug
              </Link>
            </div>

          </div>
      </div>
    </div>
  );

};

export default Footer;
