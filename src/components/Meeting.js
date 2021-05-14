import React, {useState, useEffect, useRef} from "react";
import CommentList from "./CommentList";
import {getComments, createComments} from "../services/Comment"
import {addGuest, getMeetingDetails, meetingExists} from "../services/Meeting";
import {getUsers} from "../services/Meeting";
import {getCandidateMeetings} from "../services/CandidateMeeting";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Button from "./Button"
import UserList from "./UserList";
import CandidateMeetingList from "./CandidateMeetingList";
import CreateGuest from "./CreateGuest";
import MeetingDetails from "./MeetingDetails";
import {createVote, deleteVote} from "../services/Vote";

const Meeting = ({currentGuest, onUpdateGuest, onUpdateMeetingID}) => {
   const [selectedUser, setSelectedUser] = useState(null);
   const [selectedCandidate, setSelectedCandidate] = useState(null);
   const [meetingID, setMeetingID] = useState('');
   const [meetingDetails, setMeetingDetails] = useState();
   const [userList, setUserList] = useState([]);
   const [candidateMeetings, setCandidateMeetings] = useState([]);
   const [comments, setComments] = useState([]);
   const commentForm = useRef(); // references to the comment form
   const {height} = useWindowDimensions();

   useEffect(
      () => {
         validateMeetingIDParam();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []
   );

   useEffect(
      () => {
         if (!meetingID || meetingID.length !== 6) return;
         updateMeetingDetails();
         updateComments();
         updateUserList();
         updateCandidateMeetings();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [meetingID]
   );

   //todo: update /join to take value from param
   /**
    * get desired meetingID
    * @returns
    *    meetingID from param                if param is valid
    *    relocates to /join with same param  if param is invalid (null, invalid length, or not in database)
    */
   const validateMeetingIDParam = async () => {
      //todo: increase browser support by changing searchParams function
      const meetingIDFromParam = new URLSearchParams(window.location.search).get('meetingID');

      if (!meetingIDFromParam) {
         window.history.pushState(
            {},
            '',
            '/join'
         );

         const navEvent = new PopStateEvent('popstate');
         window.dispatchEvent(navEvent);
         return;
      } else if (meetingIDFromParam.length !== 6) {
         window.history.pushState(
            {},
            '',
            '/join?meetingID=' + meetingIDFromParam
         );

         const navEvent = new PopStateEvent('popstate');
         window.dispatchEvent(navEvent);
         return;
      }

      await meetingExists(meetingIDFromParam).then(
         response => {
            if (response.data.meetingExists) {
               onUpdateMeetingID(meetingIDFromParam);
               setMeetingID(meetingIDFromParam);
            } else {
               console.error('meeting does not exist');
            }
         }
      );
   };

   const onCreateGuestUser = async (name) => {
      addGuest({name: name, meetingID: meetingID}).then(response => {
         onUpdateGuest({
            id: response.data.userID,
            name: name
         });
         updateUserList();
      });
   };

   function submitComment(event) {
      event.preventDefault();
      createComments({
         meetingID: meetingID,
         name: currentGuest.name,
         userID: currentGuest.id,
         content: event.target[0].value
      }).then(response => {
         setComments(old => [...old, response.data]);
         commentForm.current.reset();
      });
   }

   function updateMeetingDetails() {
      getMeetingDetails(meetingID).then(response => {
         setMeetingDetails(response.data.meetingDetails);
      });
   }

   function updateUserList() {
      getUsers({
         meetingID: meetingID
      }).then(response => {
         setUserList(response.data.users);
      });
   }

   function updateComments() {
      getComments({
         meetingID: meetingID
      }).then(response => {
         const comments = response.data.comments;
         setComments(comments);
      });
   }

   const onCandidateMeetingClick = async (candidateMeeting) => {
      if (candidateMeeting.voters.filter(voter => voter.userID === currentGuest.id).length > 0) {
         await deleteVote({
            userID: currentGuest.id,
            candidateID: candidateMeeting.candidateID
         }).then(() => {
            updateCandidateMeetings();
         });
      }else{
         await createVote({
            userID: currentGuest.id,
            candidateID: candidateMeeting.candidateID
         }).then(() => {
            updateCandidateMeetings();
         });
      }
   };

   function updateCandidateMeetings() {
      getCandidateMeetings(meetingID)
         .then(response => {
               setCandidateMeetings(response.data.candidateMeetings);
            }
         );
   }

   const onGuestJoin = (guest) => {
      onUpdateGuest(guest);
   };

   const onHighlightUser = (user) => {
      if(!selectedUser){
         setSelectedUser(user.id);
      }else{
         setSelectedUser(null);
      }
   };

   //if user does not have a guestID or name, todo: or if their guest id is not in the current meeting's userList
   if (!currentGuest.id || !currentGuest.name) {
      return (
         <div>
            <UserList
               userList={userList}
               selectedUser={selectedUser}
               onSelectUser={onGuestJoin}
            />
            <CreateGuest onCreateGuestUser={onCreateGuestUser}/>
         </div>
      );
   }

   if (
      !meetingDetails ||
      !meetingDetails.title ||
      !meetingDetails.dueDate ||
      !meetingDetails.meetingID ||

      !userList ||
      !userList.length > 0 ||

      !candidateMeetings ||
      !candidateMeetings.length >= 2
   ) {
      return (
         <div className="ui segment">
            <div className="ui active dimmer">
               <div className="ui text loader">Loading</div>
            </div>
            <p></p>
         </div>
      );
   }

   return (
      <div className="center aligned ui three column very relaxed stackable grid">
         <div className="column">
            <MeetingDetails meetingDetails={meetingDetails}/>
            <UserList
               userList={userList}
               selectedUser={selectedUser}
               onSelectUser={onHighlightUser}
            />
         </div>

         <div className="column">
            <CandidateMeetingList
               currentGuest={currentGuest}
               title="Vote"
               candidateMeetings={candidateMeetings}
               onCandidateMeetingClick={onCandidateMeetingClick}
               updateCandidateMeetings={updateCandidateMeetings}
            />
         </div>

         <div className="column">
            <div className={"card"} style={{overflow: "hidden", height: `${height - 155}px`}}>
               <CommentList
                  updateComments={updateComments}
                  comments={comments}
                  currentGuest={currentGuest}
                  height={height}/>
               {/* comment input */}
               <form ref={commentForm}
                     className="ui centered reply form" onSubmit={e => submitComment(e)}>
                  <div className="centered field">
                            <textarea name="content"
                                      placeholder="What are your thoughts?"
                                      style={{width: "90%", height: "50px"}}/>
                  </div>
                  <div style={{textAlign: "center"}}>
                     <Button type="submit"
                             className="custom-button dark thick span"
                             style={{width: "90%"}}>
                        Comment
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}

export default Meeting;