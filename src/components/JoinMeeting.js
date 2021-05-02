import React, {useState} from 'react';
import CodeInput from "./CodeInput";
import UserList from "./UserList";
import CreateGuest from "./CreateGuest";
import api from '../services/api';

//todo: conditionally render userName field, only if user is not logged in

const JoinMeeting = () => {
   const [meetingCode, setMeetingCode] = useState('');
   const [userID, setUserID] = useState('');
   const [userList, setUserList] = useState([]);

   const onJoinMeeting = async (meetingID) => {
      if (!isValidJoinCode(meetingID)) return;
      console.log('Valid Code Entered: ' + meetingID);
      setMeetingCode(meetingID);

      const response = await api.get('/getUsers',
         {
            params: {
               meetingID: meetingID
            }
         }
      );

      setUserList(response.data.users);
      console.log(response.data.users);
      console.log(userList);
   }

   const onCreateGuestUser = async (userName) => {
      console.log('in on create guest user function');
      const result = await api.post('/createGuestUser', {
         name: userName,
         meetingID: meetingCode
      });


      console.log(result);

   }

   if(!meetingCode){
      return (
         <div>
            <h1>Meeting Code</h1>
            <CodeInput onCodeSubmit={onJoinMeeting}/>
         </div>

      );
   }

   return (
      <div>
         <h1>Select Your Name</h1>
         <UserList userList={userList}/>
         <CreateGuest onCreateGuestUser={onCreateGuestUser}/>
      </div>
   );

};

function isValidJoinCode(joinCode) {
   if (joinCode.length < 6) {
      console.error('Invalid Code');
      return false;
   }
   return true;
}

export default JoinMeeting;
