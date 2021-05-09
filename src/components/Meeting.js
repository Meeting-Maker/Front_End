import React, {useState, useEffect, useRef} from "react";
import CommentList from "./CommentList";
import {getComments, createComments} from "../services/Comment"
import {getUsers} from "../services/Meeting"
import {getCandidateMeetings} from "../services/CandidateMeeting";
import useWindowDimensions from "../hooks/useWindowDimensions";
import Button from "./Button"
import UserList from "./UserList";
import CandidateMeetingList from "./CandidateMeetingList";
import CreateGuest from "./CreateGuest";

const Meeting = ({guestID, meetingID}) => {
   const [userList, setUserList] = useState([]);
   const [candidateMeetings, setCandidateMeetings] = useState([]);
   const [comments, setComments] = useState([]); // state to keep track of comments
   const commentForm = useRef(); // references to the comment form
   const {height} = useWindowDimensions();

   useEffect(() => {
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
         getCandidateMeetings({
            meetingID: meetingID
         }).then(response => {
            const candidateMeetings = response.data.candidateMeetings
            candidateMeetings.forEach((candidateMeeting) => {
               setCandidateMeetings(old => [...old, {
                  date: candidateMeeting.start.substring(0, 10),
                  time: candidateMeeting.start.substring(11, 16),
                  length: candidateMeeting.length
               }])
            })
         });
      }, []
   );

   /* TODO: @Brandon I don't know how you are storing the meetingID
       so i just hard coded the meetingID i have in my my database, changing it
       to each instance of the meeting
   */

   /* TODO: Same with this, meetingID, name and userID is currently hard coded, you will need to replace it with
       however you are storing the meetingID and name
   */
   function submitComment(event) {
      event.preventDefault();
      createComments({
         meetingID: "ZQTNN1",
         name: "anotheruser",
         userID: "19",
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

   if (!guestID) {
      return (
         <div>
            <UserList userList={userList}/>
            <CreateGuest/>
         </div>
      );
   }

   return (
      <div>
         <div className="center aligned ui three column very relaxed grid">

            <div className="column">
               <h3>Users</h3>
               <UserList userList={userList}/>
            </div>

            <div className="column">
               <h3>Candidate Meetings</h3>
               <CandidateMeetingList candidateMeetings={candidateMeetings}/>
            </div>

            <div className="column">
               <h3 className="centered">Comments</h3>
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
      </div>
   );
}

export default Meeting;