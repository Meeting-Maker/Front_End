import React from 'react';
import {Navbar, Image} from 'react-bootstrap';
import '../css/Footer.css';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';

const Footer = () => {

  return (

    <div>
      <Navbar className="bg-dark" fixed='bottom'>
      {/*

        Fix no images appearing bug

        <Navbar.Brand>
            <Image
              src="../images/github.png"
              rounded
            />
        </Navbar.Brand>
      */}
        <Navbar.Collapse className="justify-content-center">
          <div className="footer-text">
            <a>
              Contact Us
            </a>
            &emsp;&emsp;
            <a>
              Report a Bug
            </a>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>

  );

};

export default Footer;
