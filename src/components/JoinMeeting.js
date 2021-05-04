import React, {useState} from 'react';
import CodeInput from "./CodeInput";
import UserList from "./UserList";
import CreateGuest from "./CreateGuest";
import api from '../services/api';

//todo: conditionally render userName field, only if user is not logged in

const JoinMeeting = ({userList, setUserList, setCurrentMeeting}) => {
   const [meetingCode, setMeetingCode] = useState('');
   const [userID, setUserID] = useState('');

   const onJoinMeeting = async (meetingID) => {
      if (!isValidJoinCode(meetingID)) return;
      console.log('Valid Code Entered: ' + meetingID);
      setMeetingCode(meetingID);
      setCurrentMeeting(meetingID);

      const response = await api.get('/getUsers',
         {
            params: {
               meetingID: meetingID
            }
         }
      );

      setUserList(response.data.users);
   }

   const onCreateGuestUser = async (userName) => {
      console.log('in on create guest user function');

      const guestUser = {
         name: userName,
         meetingID: meetingCode
      };

      const result = await api.post('/createGuestUser', guestUser);
      console.log(result);

      setUserList(userList.concat(guestUser));

      //change href to meeting
      window.history.pushState(
         {},
         '',
         '/meeting'
      );

      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent)
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
