import React, {useState, useEffect} from 'react';
import {} from 'react-bootstrap';
import CreateMeetingDetails from "./CreateMeetingDetails";
import CreateCandidateMeetings from "./CreateCandidateMeetings";
import CandidateMeetingList from "./CandidateMeetingList";
import api from "../services/api";

const CreateMeeting = ({currentUser, setCurrentUser, meetingDetails, setMeetingDetails, candidateMeetings, setCandidateMeetings}) => {

   useEffect(
      () => {
         console.log('Create Meeting Rendered (useEffect)');
         //return cleanup
      },
      [currentUser, meetingDetails.pollType, candidateMeetings]
   );

   //
   const onCreateCandidateMeeting = (candidateMeeting) => {
      setCandidateMeetings(candidateMeetings.concat([candidateMeeting]));
   };

   const onCreateMeeting = async () => {
      //push to database
      const result = await api.post('/createGuestMeeting', meetingDetails)
      console.log(result);

      window.history.pushState(
         {},
         '',
         '/meeting'
      );

      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent)
   };

   //if some information is missing from meetingTitle
   if(meetingDetails.pollType === -1){
      console.log('return 1', currentUser, meetingDetails);
      return <div><CreateMeetingDetails user={currentUser} onFormSubmit={setMeetingDetails}/></div>;
   }

   //create meeting by poll
   if(meetingDetails.pollType === 0){

      //todo: fix render logic. should render until create meeting buttton is clicked. currently renders until there are 3 candidates
     if(candidateMeetings.length < 6){
        return (
           <div>
              <CreateCandidateMeetings candidateMeetings={candidateMeetings} onCreateMeeting={onCreateMeeting} onCreateCandidateMeeting={(candidateMeeting) => onCreateCandidateMeeting(candidateMeeting)}/>
              <CandidateMeetingList candidateMeetings={candidateMeetings}/>
           </div>
        );
     }
   }

   //create meeting by common availability
   if(meetingDetails.pollType === 1){
      console.log('return 3');
      return <div>Create Meeting by Common Availability</div>;
   }

   return (
      <div>
         All information captured
      </div>
   );
};

const postNewGuestUser = async () => {
   try {
      const result = await api.post('createGuestUser',{
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
      const result = await api.post('createGuestMeeting',{
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