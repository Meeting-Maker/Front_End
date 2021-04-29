import React from "react";
import {Card} from 'react-bootstrap';

const CandidateMeetingList = ({candidateMeetings}) => {

   if(candidateMeetings.length === 0){
      return (
         <div>
            <Card>
               <Card.Body>
                  Add a Meeting
               </Card.Body>
            </Card>
         </div>
      );
   }

   const renderedList = candidateMeetings.map((candidateMeeting) => {
         return (
            //sets unique key by concatenating info from candidateMeeting
            <div key={candidateMeeting.date + '-' + candidateMeeting.time + '-' + candidateMeeting.length}>
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

   return <div>{renderedList}</div>;
};

export default CandidateMeetingList;