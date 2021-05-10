import React, {useEffect, useState} from 'react';
import CreateMeetingDetails from "./CreateMeetingDetails";
import CreateCandidateMeetings from "./CreateCandidateMeetings";
import CandidateMeetingList from "./CandidateMeetingList";
import api from "../services/api";
import {createCandidateMeeting} from "../services/CandidateMeeting";
import {customAlphabet} from "nanoid";
import {storeCurrentGuest} from "../services/LocalStorage";
import {createGuestMeeting} from "../services/Meeting";

const CreateMeeting = ({currentGuest, setCurrentGuest, meetingID, setMeetingID}) => {
   const [candidateMeetings, setCandidateMeetings] = useState([]);
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
         if(!meetingID){
            const id = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)();
            console.log('MEETING ID GENERATED: ' + id);
            setMeetingID(id);
            const tempMeetingDetails = meetingDetails;
            tempMeetingDetails.meetingID = id;
            setMeetingDetails(tempMeetingDetails);
         }
      },
      []
   );

   const onCreateCandidateMeeting = (candidateMeeting) => {
      setCandidateMeetings(candidateMeetings.concat([candidateMeeting]));
      console.log('meetingID: ' + meetingID);
   };

   //todo: convert CreateMeeting button in CreateCandidateMeetings component to Link,
   //remove window.history.pushState here
   const onCreateMeeting = async () => {
      storeCurrentGuest({
         id: currentGuest.id,
         name: meetingDetails.name
      });
      await createGuestMeeting(meetingDetails);

      //todo: fix 'end' value, which needs to be calculated using date functions
      for(let i = 0; i < candidateMeetings.length; i++){
         await createCandidateMeeting(candidateMeetings[i]);
      }

      window.history.pushState(
         {},
         '',
         '/meeting'
      );

      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent)
   };

   //if user or meeting has not been set, get those details
   if (!meetingDetails.name || !meetingDetails.dueDate || !meetingDetails.title) {
      return (
         <div>
            <CreateMeetingDetails
               currentGuest={currentGuest}
               setCurrentGuest={setCurrentGuest}
               meetingID={meetingID}
               setMeetingDetails={setMeetingDetails}/>
         </div>
      );
   }

   //otherwise, capture candidateMeetings with form
   return (
      <div>
         <CreateCandidateMeetings
            meetingID={meetingID}
            candidateMeetings={candidateMeetings}
            onCreateCandidateMeeting={(candidateMeeting) => onCreateCandidateMeeting(candidateMeeting)}
            onCreateMeeting={onCreateMeeting}
         />
         <CandidateMeetingList candidateMeetings={candidateMeetings}/>
      </div>
   );
};

export default CreateMeeting;
