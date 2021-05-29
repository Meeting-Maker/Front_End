import React, {useEffect, useState} from 'react';
import CreateMeetingDetails from "./CreateMeetingDetails";
import {createGuestMeeting} from "../services/Meeting";
import {redirect} from "../services/Redirect";

const CreateMeeting = ({currentGuest, onUpdateGuest, onUpdateMeetingID}) => {
   const [meetingID, setMeetingID] = useState(null);

   useEffect( ()=> {
      if(meetingID)
         redirect('/edit', [{key: 'edit', value: 1}, {key: 'meetingID', value: meetingID}]);
   }, [meetingID])

   const onCreateMeeting = async (meetingDetails) => {
      await createGuestMeeting(meetingDetails).then(response => {
         onUpdateGuest({
            id: response.data.userID,
            name: meetingDetails.name
         });
         const id = response.data.meetingID;
         setMeetingID(id)
         onUpdateMeetingID(id)
      });

   };

   return (
      <div>
         <CreateMeetingDetails
            currentGuest={currentGuest}
            onUpdateGuest={onUpdateGuest}
            meetingID={meetingID}
            onCreateMeeting={onCreateMeeting}
            captureUserName={true}
         />
      </div>
   );
};

export default CreateMeeting;
