import React from 'react';
import '../css/Footer.css';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';
import Link from '../router/Link';

const Footer = () => {

  return (

    <div className="ui inverted vertical footer segment" style={{bottom: "0", position: "fixed", width:"100%"}}>
        <div className="ui container" style={{width: "100%"}}>
          <div className="footer-text ui grid">
            <div className="one wide column">
              <a href="https://github.com/Meeting-Maker">
                <Icon path={mdiGithub} size={1}/>
              </a>
            </div>

            <div className="fourteen wide right aligned column" style={{textAlign: "center"}}>
              <Link href="/" className="no-hover">
                Contact Us
              </Link>
              {' '}&bull;{' '}
              <Link href="/" className="no-hover">
                Report a Bug
              </Link>
            </div>
            <div className="one wide column">

            </div>
          </div>
      </div>
    </div>
  );

};

export default Footer;
