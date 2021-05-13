import React from 'react';
import '../css/Footer.css';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';


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
              <a href="mailto:meeting.maker@outlook.com?subject=Meeting Maker Contact" className="no-hover">
                Contact Us
              </a>
              {' '}&bull;{' '}
              <a href="mailto:meeting.maker@outlook.com?subject=Meeting Maker Bug"  className="no-hover">
                Report a Bug
              </a>
            </div>
            <div className="one wide column">

            </div>
          </div>
      </div>
    </div>
  );

};

export default Footer;
