import React from "react";
import {Card} from "react-bootstrap";



const MeetingDetails = ({meetingDetails}) => {
   return(
     <div>
        <Card>
           <h1>{meetingDetails.meetingName}</h1>
           {
              meetingDetails
              ?
                 <p>{meetingDetails.description}</p>
              :
                 null
           }
           <p>Response needed by: {meetingDetails.dueDate}, at {meetingDetails.dueTime}</p>

        </Card>
     </div>
   );
}

export default MeetingDetails;