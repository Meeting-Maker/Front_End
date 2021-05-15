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

const CandidateMeeting = ({currentGuest, selectedUser, candidateMeeting, onCandidateMeetingClick, onDeleteCandidateMeeting}) => {
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
   };

   const onDeleteClick = (event) => {
      event.stopPropagation();
      onDeleteCandidateMeeting(candidateMeeting.candidateID);
   };

   if (!date || !time || !length) {
      return (
         <div>candidate meeting</div>
      );
   }

   console.log('cm: ', candidateMeeting);
   const hasVoters = 'voters' in candidateMeeting;
   console.log('hv: ', hasVoters);
   const selectedUserVoted = (hasVoters && selectedUser && candidateMeeting.voters.filter(voter => voter.userID === selectedUser).length > 0);
   const currentGuestVoted = (hasVoters && candidateMeeting.voters.filter(voter => voter.userID === currentGuest.id).length > 0);
   const selectedStyle = selectedUserVoted ? "2px solid #45A29E" : "none";

   const renderedVotes = hasVoters ?
      <div>
         {
            (currentGuestVoted) ?
               <Icon
                  className={"right floated"}
                  path={mdiCheckCircleOutline}
                  size={1}
               />
               :
               null
         }
         <p>
            {
               ('voters' in candidateMeeting) ?
                  candidateMeeting.voters.length :
                  null
            }
         </p>
         <Icon onClick={(e) => onStatClick(e)}
               path={mdiPoll}
               size={1}/>
      </div>
      :
      null;



   return (
      <div
         className="candidate-meeting"
         onClick={() => onCandidateMeetingClick(candidateMeeting)}>
         <div
            className={"ui card centered"}
            style={{marginBottom: "1em", width: "90%", border: selectedStyle}}>
            <div className={"content"} style={{fontSize: "1.2em", padding: "0.5em 1em 0.5em 1em"}}>
               <div style={{float: "left"}}>
                  <Icon path={mdiCalendarRange} size={0.8}/>
                  {' '}{date}
               </div>
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
               <div className={"right floated"}>
                  {renderedVotes}
                  <Icon onClick={(e) => onDeleteClick(e)}
                        path={mdiDelete}
                        size={1}/>

               </div>
            </div>
         </div>
      </div>
   );
};

export default CandidateMeeting;