import React from "react";

const MeetingDetails = ({meetingDetails}) => {
   if(!meetingDetails){
      console.error('is null, exiting');
      return null;
   }
   const [date, time] = meetingDetails.dueDate.split('T');

   const onEditClick = (event) => {
      console.log("edit meeting");
   };

   return (
     <div>
        <h3>{meetingDetails.title}</h3>
        <h3>{meetingDetails.meetingID}</h3>
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
