import React, {useRef} from "react";
import Card from './Card';
import Button from './Button';
import Icon from '@mdi/react';
import {mdiCogOutline} from '@mdi/js';

const MeetingDetails = ({meetingDetails}) => {
   if (!meetingDetails) {
      console.error('is null, exiting');
      return null;
   }
   const [date, time] = meetingDetails.dueDate.split('T');

   const onEditClick = (event) => {
      console.log("edit meeting");
   };

   return (
      <Card padding="5rem 0 0 0 " width="35rem">

         <div className="content" style={{fontSize: "2em", padding: "0.75rem"}}>
            <span style={{fontWeight: "500"}}>
               {meetingDetails.title}
            </span>
            <span style={{color: "grey", fontWeight: "100"}}>
               {' #'}{meetingDetails.meetingID}
            </span>

            <span className="right floated">
               <a onClick={onEditClick} style={{textAlign: "left"}}>
                  <Icon path={mdiCogOutline} size={1.5}/>
               </a>
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
            <span style={{color: "black"}}>Response Needed by: {date} at {time}</span>
         </div>

      </Card>
   );
}

export default MeetingDetails;
