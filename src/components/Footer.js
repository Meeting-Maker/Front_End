import React from 'react';
import {Navbar} from 'react-bootstrap';
import '../css/Footer.css';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';

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
            <a href={"s"}>
              Contact Us
            </a>
            &emsp;&emsp;
            <a href={"s"}>
              Report a Bug
            </a>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

};

export default Footer;
