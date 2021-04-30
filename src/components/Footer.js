import React from 'react';
import {Navbar} from 'react-bootstrap';
import '../css/Footer.css';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';
import Link from './Link';

const Footer = () => {

  return (

    <div>
      <Navbar className="bg-dark" fixed='bottom'>
        <Navbar.Brand>
          <Icon path={mdiGithub}
                size={1}/>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-center">
          <div className="footer-text">
          <Link href="/">
              Contact Us
          </Link>
            &emsp;&emsp;
          <Link href="/" className="no-hover">
              Report a Bug
          </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

};

export default Footer;
