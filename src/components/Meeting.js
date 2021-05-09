import React, {useState, useEffect} from "react";
import CandidateMeetingList from "./CandidateMeetingList";
import MeetingDetails from "./MeetingDetails";
import UserList from "./UserList";
import api from '../services/api';

//todo: conditional rendering for types of meeting (poll/common availability)

const Meeting = ({guestID, meetingID}) => {
   const [userList, setUserList] = useState([]);
   const [candidateMeetings, setCandidateMeetings] = useState([]);

   useEffect(
      () => {
         const getUsers = async () => {
            const response = await api.get('/getUsers',
               {
                  params: {
                     meetingID: meetingID
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
                     meetingID: meetingID
                  }
               }
            )
            //todo: assign meetinglist
            //todo: use service function to convert db date values
            console.log(response.data.candidateMeetings);
            const candidateMeetings = response.data.candidateMeetings;
            const cms = [];
            for(let i = 0; i < candidateMeetings.length; i++){
               cms.push({
                  date: candidateMeetings[i].start.substring(0, 10),
                  time: candidateMeetings[i].start.substring(11, 16),
                  length: candidateMeetings[i].length
               });
            }
            setCandidateMeetings(cms);
         };
         getCandidateMeetings();
      }, []
   );

   return (
      <div>
         <UserList userList={userList}/>
         <CandidateMeetingList candidateMeetings={candidateMeetings}/>
      </div>
   );
}

export default Meeting;