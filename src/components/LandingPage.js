import React from 'react';
import Link from '../router/Link';
import Button from './Button';
import '../css/LandingPage.css';

const LandingPage = () => {
   return (

      <div className="ui container" style={{width: "100%", padding: "8% 0 0 0"}}>
         <div className="ui container greeting" style={{padding: "0"}}>
            <div className="ui header" style={{width: "100%", fontSize: "0.9em", margin: "0"}}>
               {'Welcome to '}
               <span style={{color: "black", display: "inline-block"}}> meeting
               </span>
               <span style={{color: "#45A29E", display: "inline-block"}}> maker
               </span>
            </div>
            <h4 style={{paddingLeft: "0", textAlign: "center"}}>
               {"Schedule meetings faster than ever, "}
               <b>no login required.</b>
            </h4>
         </div>

         <div className="ui container" style={{margin: "1em 0 4rem 0", padding: "0", textAlign: "center"}}>
            <span style={{paddingRight: "0.5rem"}}>
               <Link href="/create">
                  <Button className="custom-button thick dark" fontSize="28px">Schedule a Meeting</Button>
               </Link>
            </span>
            <span className={"padding"}>
               <Link href="/join" overflow="hidden">
                  <Button className="custom-button thick dark">Join a Meeting</Button>
               </Link>
            </span>
         </div>
      </div>
   );
};

export default LandingPage;
