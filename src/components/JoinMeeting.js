import {meetingExists} from "../services/Meeting";
import CodeInput from "./CodeInput";
import {useEffect, useState} from "react";
import {redirect} from "../services/Redirect";

//todo: conditionally render userName field, only if user is not logged in

const JoinMeeting = ({onUpdateMeetingID}) => {
   const [meetingIDFromParam, setMeetingIDFromParam] = useState('');

   useEffect(
      () => {
         validateMeetingIDFromParam();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []
   );

   useEffect(
      () => {

      }, [meetingIDFromParam]
   );

   const validateMeetingIDFromParam = async () => {
      const tempMeetingID = new URLSearchParams(window.location.search).get('meetingID');

      if(tempMeetingID) {
         setMeetingIDFromParam(tempMeetingID);
         onJoinMeeting(tempMeetingID);
      }
   }

   const onJoinMeeting = async (meetingID) => {
      await meetingExists(meetingID).then(response => {
         const exists = response.data.meetingExists;
         if(!exists){
            console.error('NO MEETING EXISTS FOR CODE ' + meetingID);
         }else{
            onUpdateMeetingID(meetingID);
            redirect('/meeting', [{key: 'meetingID', value: meetingID}]);
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
