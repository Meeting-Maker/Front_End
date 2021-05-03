import React from "react";
import CandidateMeetingList from "./CandidateMeetingList";
import MeetingDetails from "./MeetingDetails";

//todo: conditional rendering for types of meeting (poll/common availability)

const Meeting = ({currentUser, setCurrentUser, meetingDetails, setMeetingDetails, candidateMeetings, setCandidateMeetings}) => {
   return (
      <div>
         <MeetingDetails meetingDetails={meetingDetails}/>
         <CandidateMeetingList candidateMeetings={candidateMeetings}/>
      </div>
   );
}

export default Meeting;