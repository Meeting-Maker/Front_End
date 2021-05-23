import React, {useEffect, useState} from 'react';
import CreateMeetingDetails from "./CreateMeetingDetails";
import CreateCandidateMeetings from "./CreateCandidateMeetings";
import CandidateMeetingList from "./CandidateMeetingList";
import {getCandidateMeetings} from "../services/CandidateMeeting";
import {customAlphabet} from "nanoid";
import {createGuestMeeting} from "../services/Meeting";
import {redirect} from "../services/Redirect";

const CreateMeeting = ({currentGuest, onUpdateGuest, onUpdateMeetingID}) => {
   const [meetingID, setMeetingID] = useState('');

   useEffect(
      () => {
         if (!meetingID) {
            const id = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();
            setMeetingID(id);
         }
      },
      []
   );

   const onCreateMeeting = async (meetingDetails) => {
      await createGuestMeeting(meetingDetails).then(response => {
         onUpdateGuest({
            id: response.data.userID,
            name: meetingDetails.name
         });
         onUpdateMeetingID(meetingID);

         redirect('/edit', [{key: 'edit', value: 1}, {key: 'meetingID', value: meetingID}]);
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
