import React from "react";

const CandidateMeetingList = ({candidateMeetings}) => {

   //todo: convert to unique id from database
   const onCandidateMeetingClick = (candidateMeeting) => {
      //do something
      console.log('candidate meeting clicked: ', candidateMeeting);
   };

   console.log('cm: ', candidateMeetings);

   if (candidateMeetings.length === 0) {
      return (
         <div className="ui fluid card" style={{marginTop: "4rem"}}>
            No Candidate Meetings Exist
         </div>
      );
   }

   const renderedList = candidateMeetings.map((candidateMeeting) => {
      return (
         //sets unique key by concatenating info from candidateMeeting
         <div key={candidateMeeting.date + '-' + candidateMeeting.time + '-' + candidateMeeting.length} onClick={() => onCandidateMeetingClick(candidateMeeting)}>

                  {candidateMeeting.date}, {`at `}
                  {candidateMeeting.time}<br/>
                  {candidateMeeting.length} minutes


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
