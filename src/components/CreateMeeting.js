import React, {useEffect, useState} from 'react';
import CreateMeetingDetails from "./CreateMeetingDetails";
import CreateCandidateMeetings from "./CreateCandidateMeetings";
import CandidateMeetingList from "./CandidateMeetingList";
import {getCandidateMeetings} from "../services/CandidateMeeting";
import {customAlphabet} from "nanoid";
import {createGuestMeeting} from "../services/Meeting";

const CreateMeeting = ({currentGuest, onUpdateGuest, onUpdateMeetingID}) => {
   const [candidateMeetings, setCandidateMeetings] = useState([]);
   const [meetingID, setMeetingID] = useState('');
   const [page, setPage] = useState(false); //used to change pages when user inputs meetingdetails

   useEffect(
      () => {
         console.error('UPDATE: ', candidateMeetings);
      }, [candidateMeetings, page]
   );

   useEffect(
      () => {
         if (!meetingID) {
            const id = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();
            setMeetingID(id);
         }
      },
      [meetingID]
   );

   function updateCandidateMeetings() {
      getCandidateMeetings(meetingID)
         .then(response => {
               setCandidateMeetings(response.data.candidateMeetings);
            }
         );
   }

   //todo: convert CreateMeeting button in CreateCandidateMeetings component to Link,
   //remove window.history.pushState here
   const onCreateMeeting = async (meetingDetails) => {
      await createGuestMeeting(meetingDetails).then(response => {
         onUpdateGuest({
            id: response.data.userID,
            name: meetingDetails.name
         });
         onUpdateMeetingID(meetingID);
         setPage(true);
      });
   };

   //if user or meeting has not been set, get those details
   if (!page) {
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
   }

   //otherwise, capture candidateMeetings with form
   return (
      <div>
         <CreateCandidateMeetings
            meetingID={meetingID}
            candidateMeetings={candidateMeetings}
            setCandidateMeetings={setCandidateMeetings}
            onCreateMeeting={onCreateMeeting}
         />
         <CandidateMeetingList
            meetingID={meetingID}
            currentGuest={currentGuest}
            title={"Candidate Meetings"} 
            formMessage={"At least 2 Candidate Meetings are required."}
            candidateMeetings={candidateMeetings}
            updateCandidateMeetings={updateCandidateMeetings}
            onCandidateMeetingClick={() => {}}
            votingPage={false}
         />
      </div>
   );
};

export default CreateMeeting;
