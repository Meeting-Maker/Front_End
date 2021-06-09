import React from 'react';
import Icon from '@mdi/react';
import Link from '../router/Link';
import Button from './Button';
import '../css/LandingPage.css';
import {mdiClipboardEditOutline, mdiAccountGroup, mdiCellphoneMessage, mdiCogOutline} from '@mdi/js';

const LandingPage = () => {
   return (
      <div>
         <div className={"ui vertical masthead center aligned segment"} style={{border: "none"}}>
            <div className="ui container greeting" style={{padding: "4% 0 0 0"}}>
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
                  <Button className="custom-button thick dark">Schedule a Meeting</Button>
               </Link>
            </span>
               <span className={"padding"}>
               <Link href="/join" overflow="hidden">
                  <Button className="custom-button thick dark">Join a Meeting</Button>
               </Link>
            </span>
            </div>
         </div>

         <div className={"ui vertical stripe segment"} style={{padding: "0 0 0 0"}}>
            <div className={"ui middle aligned stackable grid container"}  style={{width: "100%"}}>
               <div className={"three column centered row"} style={{marginBottom: "2rem"}}>

                  <div className={"five wide column"}>
                     <div className={"ui centered card content-card"}>
                        <div className="content">
                           <div className="header">1. Create Meeting</div>
                        </div>
                        <div className={"content"} style={{border: "none", textAlign: "center"}}>
                           <Icon path={mdiClipboardEditOutline} size={4}/>
                        </div>
                        <div className={"content"} style={{border: "none", textAlign: "center", backgroundColor: "#95dbd8", fontWeight: "500"}}>
                           Create your meeting and optional meeting times
                        </div>
                     </div>
                  </div>

                  <div className={"six wide column"}>
                     <div className={"ui centered card content-card"} style={{height: "100%"}}>
                        <div className="content">
                           <div className="header">2. Share With Others</div>
                        </div>
                        <div className={"content"} style={{border: "none", textAlign: "center"}}>
                           <Icon path={mdiAccountGroup} size={4}/>
                        </div>
                        <div className="content" style={{textAlign: "center", backgroundColor: "#95dbd8", borderRadius: "8px", fontWeight: "500"}}>
                           <div>Invite others to vote on and discuss meeting times</div>
                        </div>
                     </div>
                  </div>

                  <div className={"five wide column"}>
                     <div className={"ui centered card content-card"} style={{height: "100%"}}>
                        <div className="content">
                           <div className="header">3. Get Results</div>
                        </div>
                        <div className={"content"} style={{border: "none", textAlign: "center"}}>
                           <Icon path={mdiCellphoneMessage} size={4}/>
                        </div>
                        <div className={"content"} style={{border: "none", textAlign: "center", backgroundColor: "#95dbd8", fontWeight: "500"}}>
                           Check results in real time and get notified when the meeting is chosen
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </div>

      </div>
   );
};

export default LandingPage;
