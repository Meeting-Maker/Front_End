import React from 'react';
import Icon from "@mdi/react";
import {mdiDelete, mdiClockTimeFourOutline, mdiTimerSand, mdiCalendarRange} from "@mdi/js";
import '../css/CandidateMeeting.css';
import {formatDate} from "../services/Comment";

const CandidateMeeting = ({key, candidateMeetingID, candidateMeetingStart, candidateMeetingLength}) => {

   const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satday"];

   let [date, time] = candidateMeetingStart.split('T');
   let [year, month, day] = date.split('-');
   let [hour, minute] = time.split(':');

   let noon = "AM";
   if (hour > 12) {
      hour -= 12;
      noon = "PM";
   }

   const selectedDate = new Date(year, month - 1, day, 0, 0, 0, 0);

   console.log(days[selectedDate.getDay()]);

   const onCandidateMeetingClick = (candidateMeeting) => {
      //do something
      console.log('candidate meeting clicked: ', candidateMeeting);
   };

   const onDeleteCandidateMeeting = (meetingID) => {
      //delete candidate from db
      console.log("deleted candidate: " + meetingID);
   }


   return (

      <div className="candidate-meeting" onClick={() => onCandidateMeetingClick(candidateMeetingID)}>
         <a className={"ui card centered"} style={{marginBottom: "1em", width: "90%"}}>
            <div className={"content"} style={{fontSize: "1.2em", padding: "0.5em 1em 0.5em 1em"}}>
               <div>
                  <Icon path={mdiCalendarRange} size={0.8}/>
                  {' ' +  days[selectedDate.getDay()] + ' ' + months[selectedDate.getMonth() - 1]}
                  {' - ' + selectedDate.getDate()}
                  {', ' + selectedDate.getFullYear()}
               </div>
               <div>
                  <Icon path={mdiClockTimeFourOutline} size={0.8}/>
                  {' ' +  hour + ':' + minute + '' + noon + ' '}
               </div>

               <div style={{float: "left"}}>
                  <Icon path={mdiTimerSand} size={0.8}/>
                  {' '}Duration: {candidateMeetingLength + 'm'}
               </div>
               <Icon onClick={() => onDeleteCandidateMeeting(candidateMeetingID)}
                     className={"right floated"}
                     path={mdiDelete}
                     size={1}/>
            </div>
         </a>
      </div>

   );

};

export default CandidateMeeting;