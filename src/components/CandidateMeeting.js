import React, {useEffect, useState} from 'react';
import Icon from "@mdi/react";
import {
   mdiDelete,
   mdiClockTimeFourOutline,
   mdiTimerSand,
   mdiCalendarRange,
   mdiPoll,
   mdiCheckCircleOutline
} from "@mdi/js";
import '../css/CandidateMeeting.css';

const CandidateMeeting = ({
                             currentGuest,
                             selectedUser,
                             candidateMeeting,
                             selectedCandidate,
                             onSelectCandidate,
                             onCandidateMeetingClick,
                             onDeleteCandidateMeeting,
                             votingPage
                          }) => {
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [length, setLength] = useState(null);

   useEffect(
      () => {
      }, [date, time, length]
   );

   useEffect(
      () => {
         if (!('length' in candidateMeeting)) {
            return;
         }

         setLength(candidateMeeting.length);
         if ('start' in candidateMeeting && 'meetingID' in candidateMeeting) { //is from db
            setDate(candidateMeeting.start.split('T')[0]);
            setTime(candidateMeeting.start.split('T')[1].substring(0, 5));
         } else if ('date' in candidateMeeting && 'time' in candidateMeeting) { //is from user entry
            setDate(candidateMeeting.date);
            setTime(candidateMeeting.time);
         }
      }, [candidateMeeting]
   );

   const onStatClick = (event) => {
      event.stopPropagation();
      onSelectCandidate(candidateMeeting);
   };

   const onDeleteClick = (event) => {
      event.stopPropagation();
      onDeleteCandidateMeeting(candidateMeeting.candidateID);
   };

   const hasVoters = 'voters' in candidateMeeting;
   const selectedUserVoted = (hasVoters && selectedUser && candidateMeeting.voters.filter(voter => voter.userID === selectedUser).length > 0);
   const currentGuestVoted = (hasVoters && candidateMeeting.voters.filter(voter => voter.userID === currentGuest.id).length > 0);
   const selectedStyle = selectedUserVoted || (selectedCandidate && selectedCandidate.candidateID === candidateMeeting.candidateID) ? "teal" : "";

   return (
      <div
         className="candidate-meeting"
         onClick={() => onCandidateMeetingClick(candidateMeeting)}
      style={{paddingTop: "0.5rem"}}>
         <div
            className={`ui link card ${selectedStyle} centered card-hover`}
            style={{marginBottom: "0.5em", width: "90%"}}>
            <div className={"content"} style={{fontSize: "1.2em", padding: "0.5em 1em 0.5em 1em"}}>

               <div style={{float: "left"}}>
                  <Icon path={mdiCalendarRange} size={0.8}/>
                  {' '}{date}
               </div>
               {
                  votingPage ?
                     <div className={"right floated icon-hover"}
                          style={{marginRight: "0.3em"}}>
                        {
                           currentGuestVoted ?
                              <Icon
                                 path={mdiCheckCircleOutline}
                                 size={1}
                                 style={{marginBottom: "0.2em", marginRight: "0.3em"}}
                              /> :
                              null
                        }
                        {
                           <b className={"right floated"}>{candidateMeeting.voters.length}</b>
                        }
                     </div>
                     :
                     null
               }
               <br/>
               <div style={{float: "left"}}>
                  <Icon path={mdiClockTimeFourOutline} size={0.8}/>
                  {' '}{time}
               </div>
               <br/>

               <div style={{float: "left"}}>
                  <Icon path={mdiTimerSand} size={0.8}/>
                  {' '}Duration: {length + 'm'}
               </div>
               <div className={"right floated icon-hover"}>
                  {
                     votingPage
                        ? <Icon
                           className="float-hover"
                           onClick={(e) => onStatClick(e)}
                           path={mdiPoll}
                           size={1}/>
                        :
                        null
                  }{' '}
                  {
                     currentGuest.role
                     ?
                        <Icon
                           className="float-hover"
                           onClick={(e) => onDeleteClick(e)}
                           path={mdiDelete}
                           size={1}/>
                        :
                        null
                  }
               </div>

            </div>
         </div>
      </div>
   );
};

export default CandidateMeeting;