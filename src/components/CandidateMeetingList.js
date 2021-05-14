import React, {useEffect} from 'react';
import Button from './Button';
import CandidateMeeting from "./CandidateMeeting";
import {deleteCandidateMeeting} from "../services/CandidateMeeting";

const CandidateMeetingList = ({candidateMeetings, updateCandidateMeeting, title, formMessage}) => {
      //todo: convert to unique id from database

      useEffect(
         () => {
         }, [candidateMeetings]
      );

      const onDeleteCandidateMeeting = (candidateID) => {
         deleteCandidateMeeting(candidateID).then(response => {
            updateCandidateMeetings();
         });
      };

      const onCandidateMeetingClick = (candidateID) => {
         //do something
         console.log('candidate meeting with ID clicked: ', candidateID);
      };

      if (candidateMeetings.length === 0) {
         return (
            <div className={"ui card centered grey"} style={{overflow: "hidden", width: "30rem"}}>
               <div className={"ui medium header"} style={{margin: "0.5em 0 0 0", textAlign: "center"}}>
                  No Candidate Meetings Exist
               </div>
               <div style={{textAlign: "center"}}>{formMessage}</div>
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
               {title}
            </div>
            <div style={{textAlign: "center"}}>{formMessage}</div>
            <div className={"ui list"} style={{overflow: "", marginBottom: '0'}}>
               {renderedList}
            </div>
         </div>
      );
   }
;

export default CandidateMeetingList;
