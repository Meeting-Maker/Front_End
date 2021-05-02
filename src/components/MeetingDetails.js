import React from "react";

const MeetingDetails = ({meetingDetails}) => {
   return (
     <div>
        <h3>{meetingDetails.title}</h3>
        {
           meetingDetails.description ?
              <p>{meetingDetails.description}</p>
           :
              null
        }
        <p>Response needed by: {meetingDetails.dueDate}</p>
     </div>
   );
}

export default MeetingDetails;