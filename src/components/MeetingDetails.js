import Icon from '@mdi/react';
import {mdiCogOutline} from '@mdi/js';
import {useEffect} from "react";
import {redirect} from "../services/Redirect";
import Tooltip from "./Tooltip";
import '../css/MeetingDetails.css';
import {fetchCurrentMeeting} from "../services/Storage";
import {format} from "date-fns";

const MeetingDetails = ({meetingDetails}) => {

   useEffect(
      () => {

      }, [meetingDetails]
   );

   const onCodeClick = () => {
      const joinURL = 'https://www.meetingmaker.ca/join?meetingID=' + fetchCurrentMeeting();
      navigator.clipboard.writeText(joinURL);
      alert("Link copied to clipboard.");
   };

   if (!meetingDetails || !meetingDetails.meetingID || !meetingDetails.title || !meetingDetails.dueDate) {
      return (

         <div className={"ui grid"} style={{padding: "5rem 0 0 0 "}}>
            <div className="ui container" style={{width: "35rem", paddingBottom: "1em"}}>
               <div className="ui grey fluid card" style={{}}>
                  <div className="ui segment">
                     <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                     </div>
                     <p/>
                  </div>
               </div>
            </div>
         </div>

      );
   }

   const [date, time] = meetingDetails.dueDate.split('T');

   const onEditClick = () => {
      redirect('/edit', [{key: 'edit', value: 0}, {key: 'meetingID', value: meetingDetails.meetingID}])
   };

   return (
      <div>

         <div
            className={"ui card centered grey"}
            style={{overflow: "visible", width: "33rem", paddingBottom: "0.5rem"}}
         >
            <div className="content" style={{fontSize: "2em", padding: "0.5rem 1.313rem 0.5rem", textAlign: "center"}}>
               <span style={{fontWeight: "500"}}>
                  {meetingDetails.title}
               </span>
               <span  className={"meeting-code"} onClick={() => onCodeClick()}style={{color: "grey", fontWeight: "100"}}>
               {' #'}{meetingDetails.meetingID}
               </span>
               <span className="left floated edit-button" onClick={onEditClick} style={{textAlign: "left"}}>
                     <Icon path={mdiCogOutline} size={1.2}/>
               </span>
               <span className={"right floated"}
                     style={{}}>
                  <Tooltip top={"-0.25%"} left={"102%"} width={"14rem"}>
                     This is your meeting. Click on the meeting code to the left to copy the link and share with others.
                  </Tooltip>
               </span>
            </div>
            {
               meetingDetails.description
                  ?
                  <div className="content">
                     <p style={{fontWeight: "400", fontSize: "1.2em"}}>{meetingDetails.description}</p>
                  </div>
                  :
                  null
            }
            <div className="extra content">
               <span style={{color: "black"}}>Response Needed by: {format(new Date(meetingDetails.dueDate), 'EEEE, MMMM do, @ p')}</span>
            </div>
         </div>

      </div>


   );
}

export default MeetingDetails;
