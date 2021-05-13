import React from 'react';
import Button from './Button';
import CandidateMeeting from "./CandidateMeeting";

const CandidateMeetingList = ({candidateMeetings, onUpdateCandidateMeeting, title, formMessage}) => {
      //todo: convert to unique id from database

      const onCandidateMeetingClick = (candidateMeeting) => {
         //do something
         console.log('candidate meeting clicked: ', candidateMeeting);
      };

      //redirects delete type to onDeleteLocalCandidate() or onDeleteRemoteCandidate()
      //based on composition of candidateMeeting object
      //i.e. if candidateMeeting exists in database or not
      const onDeleteCandidateMeeting = (candidateMeeting) => {
         if (
            ('date' in candidateMeeting) &&
            ('time' in candidateMeeting) &&
            ('length' in candidateMeeting)
         ) {
            onDeleteLocalCandidate(candidateMeeting);
         } else if (
            ('meetingID' in candidateMeeting) &&
            ('start' in candidateMeeting) &&
            ('length' in candidateMeeting)
         ) {
            onDeleteRemoteCandidate(candidateMeeting);
         }else{
            console.error('Cannot delete candidate meeting: ', candidateMeeting);
         }
      }

      //used to delete candidateMeetings based on user input information from state variable
      //used on /createMeeting
      const onDeleteLocalCandidate = (candidateMeeting) => {
         let tempCandidateMeetings = candidateMeetings;
         for(let i = 0; i < tempCandidateMeetings.length; i++){
            if(
               candidateMeeting.date === tempCandidateMeetings[i].date &&
               candidateMeeting.time === tempCandidateMeetings[i].time &&
               candidateMeeting.length === tempCandidateMeetings[i].length
            ){

            }
         }
      };

      //used to delete candidateMeetings based on meetingID from state variable and database
      //used on /meeting
      const onDeleteRemoteCandidate = (candidateMeeting) => {
         //delete candidate from db
         console.log("deleted candidate: " + candidateMeeting);
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
