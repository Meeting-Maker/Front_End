import React, {useEffect, useState} from 'react';
import CreateMeetingDetails from "./CreateMeetingDetails";
import CreateCandidateMeetings from "./CreateCandidateMeetings";
import CandidateMeetingList from "./CandidateMeetingList";
import {createCandidateMeetings} from "../services/CandidateMeeting";
import {customAlphabet} from "nanoid";
import {createGuestMeeting} from "../services/Meeting";

const CreateMeeting = ({currentGuest, onUpdateGuest, onUpdateMeetingID}) => {
   const [candidateMeetings, setCandidateMeetings] = useState([]);
   const [newMeetingID, setNewMeetingID] = useState('');
   const [meetingDetails, setMeetingDetails] = useState({
      name: '',
      meetingID: '',
      title: '',
      description: '',
      dueDate: '',
      pollType: 0
   });

   useEffect(
      () => {
         console.error('UPDATE: ', candidateMeetings);
      }, [candidateMeetings]
   );

   useEffect(
      () => {
         if (!newMeetingID) {
            const id = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();
            console.log('MEETING ID GENERATED: ' + id);
            setNewMeetingID(id);
            const tempMeetingDetails = meetingDetails;
            tempMeetingDetails.meetingID = id;
            setMeetingDetails(tempMeetingDetails);
         }
      },
      []
   );

   const onCreateCandidateMeeting = (candidateMeeting) => {
      setCandidateMeetings(old => [...old, candidateMeeting]);
   };

   const onDeleteCandidateMeeting = (candidateMeeting) => {
      const tempCandidateMeetings = candidateMeetings.filter(cm => !isEqualCandidateMeeting(cm, candidateMeeting));
      setCandidateMeetings(tempCandidateMeetings);
   };

   const isEqualCandidateMeeting = (cm1, cm2) => {
      return (
         cm1.meetingID === cm2.meetingID &&
         cm1.start === cm2.start &&
         cm1.length === cm2.length
      );
   };

   //todo: convert CreateMeeting button in CreateCandidateMeetings component to Link,
   //remove window.history.pushState here
   const onCreateMeeting = async () => {
      console.log('meetingdetails before: ', meetingDetails);
      await createGuestMeeting(meetingDetails).then(response => {
         console.log(response);
         onUpdateGuest({
            id: response.userID,
            name: meetingDetails.name
         });
         onUpdateMeetingID(newMeetingID);
         const candidates = async () => {
            await createCandidateMeetings(candidateMeetings).then(() => {
               window.history.pushState(
                  {},
                  '',
                  '/meeting?meetingID=' + newMeetingID
               );
               const navEvent = new PopStateEvent('popstate');
               window.dispatchEvent(navEvent)
            });
         }
         candidates();
      });
   };

   //if user or meeting has not been set, get those details
   if (!meetingDetails.name || !meetingDetails.dueDate || !meetingDetails.title) {
      return (
         <div>
            <CreateMeetingDetails
               currentGuest={currentGuest}
               onUpdateGuest={onUpdateGuest}
               newMeetingID={newMeetingID}
               setMeetingDetails={setMeetingDetails}/>
         </div>
      );
   }

   //otherwise, capture candidateMeetings with form
   return (
      <div>
         <CreateCandidateMeetings
            newMeetingID={newMeetingID}
            candidateMeetings={candidateMeetings}
            onCreateCandidateMeeting={(candidateMeeting) => onCreateCandidateMeeting(candidateMeeting)}
            onCreateMeeting={onCreateMeeting}
         />
         <CandidateMeetingList
            candidateMeetings={candidateMeetings}
            onDeleteCandidateMeeting={onDeleteCandidateMeeting}
         />
      </div>
   );
};

export default CreateMeeting;
