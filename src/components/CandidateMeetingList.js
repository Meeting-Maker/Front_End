import React, {useEffect} from 'react';
import CandidateMeeting from "./CandidateMeeting";
import {deleteCandidateMeeting} from "../services/CandidateMeeting";
import Icon from "@mdi/react";
import {mdiCogOutline} from "@mdi/js";
import {redirect} from "../services/Redirect";

const CandidateMeetingList = ({meetingID, currentGuest, selectedUser, candidateMeetings, updateCandidateMeetings, onCandidateMeetingClick, title, formMessage, renderVotes}) => {
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
               currentGuest={currentGuest}
               selectedUser={selectedUser}
               candidateMeeting={candidateMeeting}
               key={candidateMeeting.candidateID}
               onDeleteCandidateMeeting={onDeleteCandidateMeeting}
               onCandidateMeetingClick={onCandidateMeetingClick}
               renderVotes={renderVotes}
            />
         );
      });

      return (
         <div
            className={"ui card centered grey"}
            style={{overflow: "hidden", width: "30rem"}}
         >
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
