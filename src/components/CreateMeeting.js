import React, {useState, useEffect} from 'react';
import {} from 'react-bootstrap';
import CreateMeetingDetail from "./CreateMeetingDetail";
import CreateCandidateMeetings from "./CreateCandidateMeetings";

const CreateMeeting = () => {
   const [currentUser, setCurrentUser] = useState({userID: null});
   const [meetingDetails, setMeetingDetails] = useState({userName: '', meetingName: '', pollType: -1});
   const [candidateMeetings, setCandidateMeetings] = useState([]);

   useEffect(
      () => {
         console.log('rerendered');
         //return cleanup
      },
      [currentUser, meetingDetails.pollType, candidateMeetings]
   );

   //if some information is missing from meetingTitle
   if(!meetingDetails.meetingName || meetingDetails.pollType === -1){
      console.log('return 1', currentUser, meetingDetails);
      return <div><CreateMeetingDetail user={currentUser} onFormSubmit={setMeetingDetails}/></div>;
   }

   //create meeting by poll
   if(meetingDetails.pollType === 0 && candidateMeetings.length === 0){
      console.log('return 2');
      return <div><CreateCandidateMeetings onFormSubmit={setCandidateMeetings}/></div>;
   }

   //create meeting by common availability
   if(meetingDetails.pollType === 1){
      console.log('return 3');
      return <div>Create Meeting by Common Availability</div>;
   }
   //if some information is missing from meetingDetail
   if(!meetingDetails.start || !meetingDetails.length || meetingDetails.candidateMeetings.length === 0){
      console.log('return 4');
      return <div><CreateMeetingDetail/></div>;
   }

   console.log('return 5');

   return (
      <div>
         <CreateMeetingDetail user={currentUser} onFormSubmit={setMeetingDetails}/>
      </div>
   );
};

export default CreateMeeting;