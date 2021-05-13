import React from 'react';
import Button from './Button';
import CandidateMeeting from "./CandidateMeeting";

const CandidateMeetingList = ({candidateMeetings}) => {
   //todo: convert to unique id from database

   const onCandidateMeetingClick = (candidateMeeting) => {
      //do something
      console.log('candidate meeting clicked: ', candidateMeeting);
   };


   const onDeleteCandidateMeeting = (meetingID) => {
      //delete candidate from db
      console.log("deleted candidate: " + meetingID);
   };

   if (candidateMeetings.length === 0) {
      return (
         <div className="ui centered container">
            No Candidate Meetings Exist
         </div>
      );
   }


   //todo: render with nice date formats
   const renderedList = candidateMeetings.map((candidateMeeting) => {
      return (
         //sets unique key by concatenating info from candidateMeeting
         <CandidateMeeting
            candidateMeeting={candidateMeeting}
            key={candidateMeeting.start + '-' + candidateMeeting.length}
            onDeleteCandidateMeeting={onDeleteCandidateMeeting}
            onCandidateMeetingClick={onCandidateMeetingClick}
         />
      );
   });

   return (
      <div className={"ui card centered grey"} style={{overflow: "hidden", width: "30rem"}}>

         <div className={"ui medium header"} style={{margin: "0.5em 0 0 0", textAlign: "center"}}>
            Vote
         </div>

         <div className={"ui list"} style={{ overflow: "", marginBottom: '0'}}>
            {renderedList}
         </div>

      </div>
   );
}

export default CandidateMeetingList;
