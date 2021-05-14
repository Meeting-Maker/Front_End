import React, {useEffect, useState} from 'react';
import CreateMeetingDetails from "./CreateMeetingDetails";
import CreateCandidateMeetings from "./CreateCandidateMeetings";
import CandidateMeetingList from "./CandidateMeetingList";
import {getCandidateMeetings} from "../services/CandidateMeeting";
import {customAlphabet} from "nanoid";
import {createGuestMeeting} from "../services/Meeting";

const CreateMeeting = ({currentGuest, onUpdateGuest, onUpdateMeetingID}) => {
   const [candidateMeetings, setCandidateMeetings] = useState([]);
   const [newMeetingID, setNewMeetingID] = useState('');
   const [page, setPage] = useState(false); //used to change pages when user inputs meetingdetails

   useEffect(
      () => {
         console.error('UPDATE: ', candidateMeetings);
      }, [candidateMeetings, page]
   );

   function updateCandidateMeetings() {
      setCandidateMeetings([]);
      getCandidateMeetings(newMeetingID)
         .then(response => {
               setCandidateMeetings(response.data.candidateMeetings);
            }
         );
   }

   useEffect(
      () => {
         if (!newMeetingID) {
            const id = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();
            console.log('MEETING ID GENERATED: ' + id);
            setNewMeetingID(id);
         }
      },
      []
   );

   //todo: update to db
   const onDeleteCandidateMeeting = (candidateMeeting) => {

   };

   //todo: convert CreateMeeting button in CreateCandidateMeetings component to Link,
   //remove window.history.pushState here
   const onCreateMeeting = async (meetingDetails) => {
      await createGuestMeeting(meetingDetails).then(response => {
         onUpdateGuest({
            id: response.data.userID,
            name: meetingDetails.name
         });
         onUpdateMeetingID(newMeetingID);
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
               newMeetingID={newMeetingID}
               onCreateMeeting={onCreateMeeting}
            />
         </div>
      );
   }

   //otherwise, capture candidateMeetings with form
   return (
      <div>
         <CreateCandidateMeetings
            newMeetingID={newMeetingID}
            candidateMeetings={candidateMeetings}
            setCandidateMeetings={setCandidateMeetings}
            onCreateMeeting={onCreateMeeting}
         />
         <CandidateMeetingList
            title={"Candidate Meetings"} 
            formMessage={"At least 2 Candidate Meetings are required."}
            candidateMeetings={candidateMeetings}
            updateCandidateMeetings={updateCandidateMeetings}
         />
      </div>
   );
};

export default CreateMeeting;
