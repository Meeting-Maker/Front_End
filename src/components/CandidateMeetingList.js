import React, {useEffect} from 'react';
import Button from './Button';

const CandidateMeetingList = ({candidateMeetings}) => {
   //todo: convert to unique id from database

   useEffect(
      () => {
         console.log('candidateMeetigns: ', candidateMeetings);
      }, [candidateMeetings]
   );

   const onCandidateMeetingClick = (candidateMeeting) => {
      //do something
      console.log('candidate meeting clicked: ', candidateMeeting);
   };

   if (candidateMeetings.length === 0) {
      return (
         <div className="ui container" >
            No Candidate Meetings Exist
         </div>
      );
   }

   const onDeleteCandidateMeeting = (meetingID) =>{
      //delete candidate from db
      console.log("deleted candidate: " + meetingID);
   }

   //todo: render with nice date formats
   const renderedList = candidateMeetings.map((candidateMeeting) => {
      return (
         //sets unique key by concatenating info from candidateMeeting
         <div key={candidateMeeting.meetingID + '-' + candidateMeeting.start + '-' + candidateMeeting.length} onClick={() => onCandidateMeetingClick(candidateMeeting)}>
                  {candidateMeeting.start}<br/>
                  {candidateMeeting.length} minutes
                  <Button className="custom-button dark thick" onClick={() =>onDeleteCandidateMeeting(candidateMeeting)}>Delete</Button>
         </div>
      );
   });

   return (
      <div>
         <h2>Options</h2>
         {renderedList}
      </div>
   );
};

export default CandidateMeetingList;
