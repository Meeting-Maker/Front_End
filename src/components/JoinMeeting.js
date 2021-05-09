import React, {useEffect, useState} from 'react';
import CodeInput from "./CodeInput";

//todo: conditionally render userName field, only if user is not logged in

const JoinMeeting = ({currentGuest, setMeetingID}) => {
   const [meetingCode, setMeetingCode] = useState('');

   const onJoinMeeting = async (meetingID) => {
      if (!isValidJoinCode(meetingID)) return;
      console.log('Valid Code Entered: ' + meetingID);
      setMeetingCode(meetingID);
      setMeetingID(meetingID);

      //todo: change to work with link component instead
      //change href to meeting
      window.history.pushState(
         {},
         '',
         '/meeting'
      );

      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent)
   }

   return (
      <div>
         <CodeInput onCodeSubmit={onJoinMeeting}/>
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
