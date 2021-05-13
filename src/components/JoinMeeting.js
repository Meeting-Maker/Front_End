import {meetingExists} from "../services/Meeting";
import CodeInput from "./CodeInput";
import {useEffect, useState} from "react";

//todo: conditionally render userName field, only if user is not logged in

const JoinMeeting = ({onUpdateMeetingID}) => {
   const [meetingIDFromParam, setMeetingIDFromParam] = useState('');

   useEffect(
      () => {
         validateMeetingIDFromParam();
      }, []
   );

   useEffect(
      () => {

      }, [meetingIDFromParam]
   );

   const validateMeetingIDFromParam = async () => {
      const tempMeetingID = new URLSearchParams(window.location.search).get('meetingID');

      console.error('ASDFASDFASD: ', tempMeetingID);

      if(tempMeetingID) {
         setMeetingIDFromParam(tempMeetingID);
         onJoinMeeting(tempMeetingID);
      }
   }

   const onJoinMeeting = async (meetingID) => {
      await meetingExists(meetingID).then(response => {
         console.error('TTTTTT: ', response);
         const exists = response.data.meetingExists;
         if(!exists){
            console.error('NO MEETING EXISTS FOR CODE ' + meetingID);
         }else{
            console.log('Valid Code Entered: ' + meetingID);
            onUpdateMeetingID(meetingID);

            window.history.pushState(
               {},
               '',
               '/meeting?meetingID=' + meetingID
            );

            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent)
         }
      });
   }

   return (
      <div>
         <CodeInput
            onCodeSubmit={onJoinMeeting}
            meetingIDFromParam={meetingIDFromParam}
         />
      </div>
   );
};

export default JoinMeeting;
