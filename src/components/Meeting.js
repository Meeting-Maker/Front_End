import React, {useState, useEffect, useRef} from "react";
import CommentList from "./CommentList";
import {getComments, createComments} from "../services/Comment"
import {getUsers} from "../services/Meeting"
import {getCandidateMeetings} from "../services/CandidateMeeting";
import {addGuest, getMeetingDetails} from "../services/Meeting";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Button from "./Button"
import UserList from "./UserList";
import CandidateMeetingList from "./CandidateMeetingList";
import CreateGuest from "./CreateGuest";
import MeetingDetails from "./MeetingDetails";

const Meeting = ({currentGuest, setCurrentGuest, meetingID}) => {
   const [meetingDetails, setMeetingDetails] = useState();
   const [userList, setUserList] = useState([]);
   const [candidateMeetings, setCandidateMeetings] = useState([]);
   const [comments, setComments] = useState([]);
   const commentForm = useRef(); // references to the comment form
   const {height} = useWindowDimensions();

   useEffect(
      () => {
         console.error('CMS CMS CMS: ', candidateMeetings);
      }, [meetingID]
   );

   useEffect(() => {
         getMeetingDetails({
            meetingID: meetingID
         }).then(response => {
            console.log(response);
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
         });
      }, [meetingID, currentGuest]
   );

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