import {meetingExists} from "../services/Meeting";
import CodeInput from "./CodeInput";

//todo: conditionally render userName field, only if user is not logged in

const JoinMeeting = ({setMeetingID}) => {

   const onJoinMeeting = async (meetingID) => {
      await meetingExists(meetingID).then(response => {
         const exists = response.data.meetingExists;
         if(!exists){
            console.error('NO MEETING EXISTS FOR CODE ' + meetingID);
         }else{
            console.log('Valid Code Entered: ' + meetingID);
            setMeetingID(meetingID);

            window.history.pushState(
               {},
               '',
               '/meeting'
            );

            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent)
         }
      });
   }

   return (
      <div>
         <CodeInput onCodeSubmit={onJoinMeeting}/>
      </div>
   );
};

export default JoinMeeting;
