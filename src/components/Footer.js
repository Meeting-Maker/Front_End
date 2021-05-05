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
                <Icon path={mdiGithub} size={2}/>
              </a>
            </div>
            <div className="seven wide right aligned column">
              <a href="mailto:meeting.maker@outlook.com?subject=Meeting Maker - User Email" className="no-hover">
                Contact Us
              </a>
            </div>
            <div className="eight wide column">
              <a href="mailto:meeting.maker@outlook.com?subject=Meeting Maker - Bug Report" className="no-hover">
                Report a Bug
              </a>
            </div>
          </div>
      </div>
    </div>
  );

};

export default Footer;
