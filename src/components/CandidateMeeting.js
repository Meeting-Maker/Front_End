import React, {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {
   mdiDelete,
   mdiClockTimeFourOutline,
   mdiTimerSand,
   mdiCalendarRange,
   mdiPoll,
   mdiCheckCircleOutline,
} from "@mdi/js";
import "../css/CandidateMeeting.css";
import {format} from "date-fns";

const CandidateMeeting = ({
                             currentGuest,
                             selectedUser,
                             candidateMeeting,
                             selectedCandidate,
                             onSelectCandidate,
                             onCandidateMeetingClick,
                             onDeleteCandidateMeeting,
                             votingPage,
                             candidateMeetings
                          }) => {
   const [date, setDate] = useState("");
   const [time, setTime] = useState("");
   const [length, setLength] = useState(null);


   useEffect(() => {
   }, [date, time, length]);

   useEffect(() => {
      if (!("length" in candidateMeeting)) {
         return;
      }

      setLength(candidateMeeting.length);
      if ("start" in candidateMeeting && "meetingID" in candidateMeeting) {
         //is from db
         setDate(candidateMeeting.start.split("T")[0]);
         setTime(candidateMeeting.start.split("T")[1].substring(0, 5));
      } else if ("date" in candidateMeeting && "time" in candidateMeeting) {
         //is from user entry
         setDate(candidateMeeting.date);
         setTime(candidateMeeting.time);
      }
   }, [candidateMeeting]);

   const onStatClick = (event) => {
      event.stopPropagation();
      onSelectCandidate(candidateMeeting);
   };

   const onDeleteClick = (event) => {
      event.stopPropagation();
      onDeleteCandidateMeeting(candidateMeeting.candidateID);
   };

   const hasVoters = "voters" in candidateMeeting;
   const selectedUserVoted =
      hasVoters &&
      selectedUser &&
      candidateMeeting.voters.filter((voter) => voter.userID === selectedUser)
         .length > 0;
   const currentGuestVoted =
      hasVoters &&
      candidateMeeting.voters.filter((voter) => voter.userID === currentGuest.id)
         .length > 0;
   const selectedStyle =
      selectedUserVoted ||
      (selectedCandidate &&
         selectedCandidate.candidateID === candidateMeeting.candidateID)
         ? "#45A29E"
         : "#d4d4d5";

   const nDate = new Date(date + 'T' + time + ':00');

   return (
      <div
         className="candidate-meeting"
         onClick={() => onCandidateMeetingClick(candidateMeeting)}
         style={{paddingTop: "0.5rem"}}
      >
         <div
            className={`ui link card centered card-hover`}
            style={{
               marginBottom: "0.5em",
               width: "90%",
               boxShadow: `0 0 0 1px ${selectedStyle}`,
            }}
         >
            <div
               className={"content"}
               style={{fontSize: "1.2em", padding: "0.5em 1em 0.5em 1em"}}
            >
               <div style={{float: "left"}}>
                  <Icon path={mdiCalendarRange} size={0.8}/> {format(nDate, 'EEEE, MMMM do')}
               </div>
               {votingPage ? (
                  <div
                     className={"right floated icon-hover"}
                     style={{marginRight: "0.3em"}}
                  >
                     {currentGuestVoted ? (
                        <Icon
                           path={mdiCheckCircleOutline}
                           size={1}
                           //#45A29E...#17cf17
                           style={{
                              marginBottom: "0.2em",
                              marginRight: "0.3em",
                              color: "#45A29E",
                           }}
                        />
                     ) : null}
                     {
                        <b className={"right floated"}>
                           {candidateMeeting.voters.length}
                        </b>
                     }
                  </div>
               ) : null}
               <br/>
               <div style={{float: "left"}}>
                  <Icon path={mdiClockTimeFourOutline} size={0.8}/> {format(nDate, 'p')}
               </div>
               <br/>

               <div style={{float: "left"}}>
                  <Icon path={mdiTimerSand} size={0.8}/> {length + "m"}
               </div>
               <div className={"right floated icon-hover"}>
                  {votingPage ?
                     <Icon
                        className="float-hover"
                        onClick={(e) => onStatClick(e)}
                        path={mdiPoll}
                        size={1}
                     />
                     : null}
                  {" "}
                  {currentGuest.role && candidateMeetings.length > 2 ?
                     <Icon
                        className="float-hover"
                        onClick={(e) => onDeleteClick(e)}
                        path={mdiDelete}
                        size={1}
                     />
                     : null}
               </div>
            </div>
         </div>
      </div>
   );
};

export default CandidateMeeting;
