import React, {useState} from 'react';
import CodeInput from "./CodeInput";
import UserList from "./UserList";

//todo: conditionally render userName field, only if user is not logged in

const users = [
   {
      userID: 0,
      name: 'brandon',
      email: '',
      guest: true
   },
   {
      userID: 1,
      name: 'steve',
      email: '',
      guest: true
   },
   {
      userID: 2,
      name: 'ming',
      email: '',
      guest: true
   },
   {
      userID: 3,
      name: 'joe',
      email: '',
      guest: true
   }
];

const JoinMeeting = () => {
   const [meetingCode, setMeetingCode] = useState('');

   const onFormSubmit = (joinCode) => {
      if (!isValidJoinCode(joinCode)) return;
      console.log('Valid Code Entered: ' + joinCode);
      setMeetingCode(joinCode);
   }

   if(!meetingCode){
      return (
         <div>
            <h1>Meeting Code</h1>
            <CodeInput onCodeSubmit={onFormSubmit}/>
         </div>

      );
   }

   return (
      <div>
         <h1>Select Your Name</h1>
         <UserList users={users}/>
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
