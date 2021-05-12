import React from 'react';
import CandidateMeeting from "./CandidateMeeting";

const CandidateMeetingList = ({candidateMeetings}) => {
   //todo: convert to unique id from database

   const onCandidateMeetingClick = (candidateMeeting) => {
      //do something
      console.log('candidate meeting clicked: ', candidateMeeting);
   };

   if (candidateMeetings.length === 0) {
      return (
         <div className="ui container">
            No Candidate Meetings Exist
         </div>
      );
   }

   const onDeleteCandidateMeeting = (meetingID) => {
      //delete candidate from db
      console.log("deleted candidate: " + meetingID);
   }
   //todo: render with nice date formats

   const renderedList = candidateMeetings.map((candidateMeeting) => {
      return (
         //sets unique key by concatenating info from candidateMeeting
         <div
            key={candidateMeeting.start + '-' + candidateMeeting.length}
            onClick={() => onCandidateMeetingClick(candidateMeeting)}
         >
            {candidateMeeting.start}<br/>
            {candidateMeeting.length} minutes
            <Button className="custom-button dark thick"
                    onClick={() => onDeleteCandidateMeeting(candidateMeeting)}>Delete</Button>
         </div>
      );
   });

   return (
      <div className={"ui card centered grey"} style={{overflow: "hidden", width: "30rem"}}>
         <div className={"ui medium header"} style={{margin: "0.5em 0 0 0", textAlign: "center"}}>
            Candidate Meetings
         </div>

         <div className={"ui list"} style={{ overflow: "", marginBottom: '0'}}>
            {renderedList}
         </div>
      </div>
   );
};

export default CandidateMeetingList;
