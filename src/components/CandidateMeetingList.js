import React from "react";
import {Card} from 'react-bootstrap';

const CandidateMeetingList = ({candidateMeetings}) => {

   //todo: convert to unique id from database
   const onCandidateMeetingClick = (candidateMeeting) => {
      //do something
      console.log('candidate meeting clicked: ', candidateMeeting);
   };

   console.log('cm: ', candidateMeetings);

   if (candidateMeetings.length === 0) {
      return (
         <div>
            <Card>
               <Card.Body>
                  No Candidate Meetings Exist Yet
               </Card.Body>
            </Card>
         </div>
      );
   }

   const renderedList = candidateMeetings.map((candidateMeeting) => {
      return (
         //sets unique key by concatenating info from candidateMeeting
         <div key={candidateMeeting.date + '-' + candidateMeeting.time + '-' + candidateMeeting.length} onClick={() => onCandidateMeetingClick(candidateMeeting)}>
            <Card>
               <Card.Body>
                  {candidateMeeting.date}, {`at `}
                  {candidateMeeting.time}<br/>
                  {candidateMeeting.length} minutes
               </Card.Body>
            </Card>
         </div>
      );
   });


   console.log('rendered list: ', renderedList);

   return (
      <div>
         <h2>Options</h2>
         {renderedList}
      </div>
   );
};

export default CandidateMeetingList;