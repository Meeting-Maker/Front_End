import React, {useState, useEffect} from "react";
import CandidateMeetingList from "./CandidateMeetingList";
import MeetingDetails from "./MeetingDetails";
import UserList from "./UserList";
import api from '../services/api';

//todo: conditional rendering for types of meeting (poll/common availability)

const Meeting = ({currentUser, currentMeeting}) => {
   const [userList, setUserList] = useState([]);
   const [candidateMeetings, setCandidateMeetings] = useState([]);

   // useEffect(
   //    () => {
   //       const getCandidates = async () => {
   //          const response = await api.get('/getCandidateMeetings',
   //             {
   //                params: {
   //                   meetingID: currentMeeting
   //                }
   //             }
   //          );
   //       };
   //    }, [candidateMeetings]
   // );

   useEffect(
      () => {
         const getUsers = async () => {
            const response = await api.get('/getUsers',
               {
                  params: {
                     meetingID: currentMeeting
                  }
               }
            )
            setUserList(response.data.users);
         };
         getUsers();

         const getCandidateMeetings = async () => {
            const response = await api.get('/getCandidateMeetings',
               {
                  params: {
                     meetingID: currentMeeting
                  }
               }
            )
            //todo: assign meetinglist
            console.log(response.data);
            //setCandidateMeetings(response.data);
         };
         getCandidateMeetings();
      }, []
   );

   return (
      <div>
         <UserList userList={userList}></UserList>
         <CandidateMeetingList candidateMeetings={candidateMeetings}/>
      </div>
   );
}

export default Meeting;