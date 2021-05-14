import React, {useEffect, useState} from 'react';
import Icon from "@mdi/react";
import {mdiDelete, mdiClockTimeFourOutline, mdiTimerSand, mdiCalendarRange, mdiPoll} from "@mdi/js";
import '../css/CandidateMeeting.css';

const CandidateMeeting = ({candidateMeeting, onCandidateMeetingClick, onDeleteCandidateMeeting}) => {
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [length, setLength] = useState(null);

   useEffect(
      () => {
      }, [date, time, length]
   );


   useEffect(
      () => {
         if(!('length' in candidateMeeting)){
            return;
         }

         setLength(candidateMeeting.length);
         if('start' in candidateMeeting && 'meetingID' in candidateMeeting){ //is from db
            setDate(candidateMeeting.start.split('T')[0]);
            setTime(candidateMeeting.start.split('T')[1].substring(0, 5));
         }else if('date' in candidateMeeting && 'time' in candidateMeeting){ //is from user entry
            setDate(candidateMeeting.date);
            setTime(candidateMeeting.time);
         }
      }, [candidateMeeting]
   );

   if(!date || !time || !length){
      return (
         <div>candidate meeting</div>
      );
   }

   return (
      <div
         className="candidate-meeting"
         onClick={() => onCandidateMeetingClick(candidateMeeting.candidateID)}>
         <a className={"ui card centered"} style={{marginBottom: "1em", width: "90%"}}>
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
               <div>
                  <Icon onClick={() => onDeleteCandidateMeeting(candidateMeeting.candidateID)}
                        className={"right floated"}
                        path={mdiDelete}
                        size={1}/>
                  <Icon onClick={() => console.log('stat')}
                        className={"right floated"}
                        path={mdiPoll}
                        size={1}/>
               </div>
            </div>
         </a>
      </div>
   );
};

export default CandidateMeeting;