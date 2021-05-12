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
import {Spinner} from "react-bootstrap";

const Meeting = ({currentGuest, onUpdateGuest, onUpdateMeetingID}) => {
   const [meetingID, setMeetingID] = useState('');
   const [meetingDetails, setMeetingDetails] = useState();
   const [userList, setUserList] = useState([]);
   const [candidateMeetings, setCandidateMeetings] = useState([]);
   const [comments, setComments] = useState([]);
   const commentForm = useRef(); // references to the comment form
   const {height} = useWindowDimensions();

   //used for data updates
   useEffect(
      () => {
         console.log('-------------PRINTING CHANGES---------------');
         console.log('meetingID: ', meetingID);
         console.log('meetingDetails', meetingDetails);
         console.log('userList', userList);
         console.log('candidateMeetings', candidateMeetings);
         console.log('comments', comments);

      }, [meetingID, meetingDetails, userList, candidateMeetings, comments]
   );

   useEffect(
      () => {
         validateMeetingIDParam();
      }, []
   );

   useEffect(
      () => {
         if (!meetingID || meetingID.length !== 6) return;

         getMeetingDetails(meetingID).then(response => {
            setMeetingDetails(response.data.meetingDetails);
         });

         setUserList([]);
         getUsers({
            meetingID: meetingID
         }).then(response => {
            const users = response.data.users;
            users.forEach(user => setUserList(old => [...old, user]));
         });

         setComments([]);
         getComments({
            meetingID: meetingID
         }).then(response => {
            const comments = response.data.comments;
            setComments(comments);
         });

         setCandidateMeetings([]);
         getCandidateMeetings(meetingID).then(response => {
               const candidateMeetings = response.data.candidateMeetings
               candidateMeetings.forEach((candidateMeeting) => {
                  setCandidateMeetings(old => [...old, {
                     date: candidateMeeting.start.substring(0, 10),
                     time: candidateMeeting.start.substring(11, 16),
                     length: candidateMeeting.length
                  }])
               })
            }
         );
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

      if(!meetingIDFromParam){
         window.history.pushState(
            {},
            '',
            '/join'
         );

         const navEvent = new PopStateEvent('popstate');
         window.dispatchEvent(navEvent);
         return;
      }else if(meetingIDFromParam.length !== 6){
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

   function updateComments() {
      setComments([]);
      getComments({
         meetingID: "ZQTNN1"
      }).then(response => {
         const comments = response.data.comments;
         console.log(comments);
         setComments(comments);
      });
   }

   const onGuestJoin = (guest) => {
      setCurrentGuest(guest);
   };

   const onCreateGuestUser = async (name) => {
      addGuest({name: name, meetingID: meetingID}).then(response => {
         onGuestJoin({
            id: response.data.userID,
            name: name
         });
      });
   };

   const onHighlightUser = (user) => {
      console.error('HIGHLIGHT USER: ', user);
   };

   //if user does not have a guestID or name, todo: or if their guest id is not in the current meeting's userList
   if (!currentGuest.id || !currentGuest.name) {
      return (
         <div>
            <UserList userList={userList} onSelectUser={onGuestJoin}/>
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
            <UserList userList={userList} onSelectUser={onHighlightUser}/>
         </div>

         <div className="column">
            <CandidateMeetingList candidateMeetings={candidateMeetings}/>
         </div>

         <div className="column">
            <div className={"card"} style={{overflow: "hidden", height: `${height - 155}px`}}>
               <CommentList
                  updateComments={updateComments}
                  comments={comments}
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