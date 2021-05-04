import React, {useState, useEffect} from "react";
import CandidateMeetingList from "./CandidateMeetingList";
import MeetingDetails from "./MeetingDetails";
import UserList from "./UserList";
import api from '../services/api';

//todo: conditional rendering for types of meeting (poll/common availability)

const Meeting = ({currentUser, currentMeeting}) => {
   const [userList, setUserList] = useState([]);
   const [candidateMeetings, setCandidateMeetings] = useState([]);

   useEffect(
      () => {

      },[candidateMeetings]
   );

   const getCandidates = async () => {
      const response = await api.get('/getCandidateMeetings',
         {
            params: {
               meetingID: currentMeeting
            }
         }
      );
   };

   const getUsers = async () => {
     const response = await api.get('/getUsers',
        {
           params: {

           }
        }
     )
   };

   if(!currentUser){
      return <UserList userList={userList}/>
   }
   return (
      <div>
         <UserList userList={userList}/>
         <CandidateMeetingList candidateMeetings={candidateMeetings}/>
      </div>
   );
}

export default Meeting;