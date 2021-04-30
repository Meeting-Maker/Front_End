import React from "react";
import CandidateMeetingList from "./CandidateMeetingList";

//todo: conditional rendering for types of meeting (poll/common availability)

const Meeting = ({currentUser, setCurrentUser, meetingDetails, setMeetingDetails, candidateMeetings, setCandidateMeetings}) => {
   return <div><CandidateMeetingList candidateMeetings={candidateMeetings}/></div>;
}

export default Meeting;