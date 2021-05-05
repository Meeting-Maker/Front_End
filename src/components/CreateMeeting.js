import React, {useEffect, useState} from 'react';
import CreateMeetingDetails from "./CreateMeetingDetails";
import CreateCandidateMeetings from "./CreateCandidateMeetings";
import CandidateMeetingList from "./CandidateMeetingList";
import api from "../services/api";

const CreateMeeting = ({currentUser, setCurrentUser, setCurrentMeeting}) => {
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
         console.log('Create Meeting Rendered (useEffect)');
         //return cleanup
      },
      [currentUser, meetingDetails.meetingID]
   );

   const onCreateCandidateMeeting = (candidateMeeting) => {
      setCandidateMeetings(candidateMeetings.concat([candidateMeeting]));
   };

   //todo: convert CreateMeeting button in CreateCandidateMeetings component to Link,
   // remove window.history.pushState here
   const onCreateMeeting = async () => {
      await api.post('/createGuestMeeting', meetingDetails);
      setCurrentMeeting(meetingDetails.meetingID);

      for(var i = 0; i < candidateMeetings.length; i++){
         console.log('cm:  ', candidateMeetings);
         console.log('here: ', candidateMeetings[i]);
         const candidateMeeting = candidateMeetings[i];
         await api.post('/createCandidateMeeting',
            {
               start: candidateMeeting.date + 'T' + candidateMeeting.time + ':00',
               end: candidateMeeting.date + 'T' + candidateMeeting.time + ':00',
               length: candidateMeeting.length,
               meetingID: meetingDetails.meetingID
            }
         );
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
   if (!currentUser || !meetingDetails.meetingID) {
      return (
         <div>
            <CreateMeetingDetails
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
               setMeetingDetails={setMeetingDetails}
            />
         </div>
      );
   }

   //otherwise, capture candidateMeetings with form
   return (
      <div>
         <CreateCandidateMeetings
            candidateMeetings={candidateMeetings}
            onCreateCandidateMeeting={(candidateMeeting) => onCreateCandidateMeeting(candidateMeeting)}
            onCreateMeeting={onCreateMeeting}
         />
         <CandidateMeetingList candidateMeetings={candidateMeetings}/>
      </div>
   );
};

const postNewGuestUser = async () => {
   try {
      const result = await api.post('createGuestUser', {
         name: 'from front_end',
         meetingID: "abc987",
         title: 'title from front_end',
         description: 'description from front_end',
         pollType: 1
      });
      console.log(result.data);
   } catch (err) {
      console.log('error', err);
   }
}

const postMeeting = async () => {
   try {
      const result = await api.post('createGuestMeeting', {
         name: 'from front_end',
         meetingID: "abc987",
         title: 'title from front_end',
         description: 'description from front_end',
         pollType: 1
      });
      console.log(result.data);
   } catch (err) {
      console.log('error', err);
   }
}

export default CreateMeeting;
