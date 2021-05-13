import React, {useEffect, useState} from 'react';
import Icon from "@mdi/react";
import {mdiDelete, mdiClockTimeFourOutline, mdiTimerSand, mdiCalendarRange, mdiPoll} from "@mdi/js";
import '../css/CandidateMeeting.css';
import {getStandardSuffix, getDayString, getMonthString, breakStandardDate} from "../services/Date";

const CandidateMeeting = ({candidateMeeting, onCandidateMeetingClick, onDeleteCandidateMeeting}) => {
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [length, setLength] = useState(null);

   useEffect(
      () => {
         console.log('date: ', date);
         console.log('time: ', time);
         console.log('length: ', length);
      }, [date, time, length]
   );

   useEffect(
      () => {
         console.log('cm: ', candidateMeeting);
         if(!('length' in candidateMeeting)){
            console.error('length not in cm');
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
         onClick={() => onCandidateMeetingClick(date + 'T' + time + '-' + candidateMeeting.length)}>
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
               <Icon onClick={() => console.log('stat')}
                     className={"right floated"}
                     path={mdiPoll}
                     size={1}/>
               <Icon onClick={() => onDeleteCandidateMeeting(date + 'T' + time + '-' + candidateMeeting.length)}
                     className={"right floated"}
                     path={mdiDelete}
                     size={1}/>
            </div>
         </a>
      </div>
   );
};

export default CandidateMeeting;