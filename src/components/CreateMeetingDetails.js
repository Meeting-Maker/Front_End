import React, {useState} from 'react';
import Button from './Button';
import Card from './Card';

const CreateMeetingDetails = ({currentUser, setCurrentUser, meetingID, setMeetingDetails}) => {
   const [userName, setUserName] = useState('');
   const [meetingName, setMeetingName] = useState('');
   const [meetingDescription, setMeetingDescription] = useState('');
   const [dueDate, setDueDate] = useState('');
   const [dueTime, setDueTime] = useState('');
   const [pollType, setPollType] = useState(0);
   const [error, setError] = useState(false);

   const onCreateMeetingDetails = (event) => {
      event.preventDefault();

      if(
         userName === ''
         || meetingName === ''
         || dueDate === ''
         || dueTime === ''
      ){
         setError(true);
         return;
      }else{
         setError(false);
      }

      setCurrentUser(userName);

      const meetingDetail = {
         name: userName,
         meetingID: meetingID,
         title: meetingName,
         description: meetingDescription,
         dueDate: dueDate + 'T' + dueTime + ':00',
         pollType: pollType
      };

      console.log(meetingDetail);
      setMeetingDetails(meetingDetail);
   };

   return (
      <Card width="40%" padding="10rem 0 0 0">

         <div className="content">
            <div className="header">
               Create Your Meeting
            </div>
         </div>

         <div className="content">
            <form className="ui large form" onSubmit={(e) => onCreateMeetingDetails(e)}>

               {
                  currentUser.userID
                     ?
                     null
                     :
                     <div className="field">
                        <label className="left aligned">Your Name</label>
                        <input
                           type="text"
                           placeholder="Your Name"
                           name="meetingCreatorName"
                           value={userName}
                           onChange={(e) => setUserName(e.target.value)}
                        />
                     </div>
               }

               <div className="field">
                  <label className="left aligned">Meeting Name</label>
                  <input
                     type="text"
                     placeholder="Meeting Name"
                     name="meetingName"
                     value={meetingName}
                     onChange={(e) => setMeetingName(e.target.value)}
                  />
               </div>

               <div className="field">
                  <label className="left aligned">Description</label>
                  <input
                     as="textarea"
                     placeholder="Description"
                     name="description"
                     value={meetingDescription}
                     onChange={(e) => setMeetingDescription(e.target.value)}
                  />
               </div>

               <div className="field">
                  <label className="left aligned">Response Needed By</label>
                  <div className="two fields">
                     <div className="field">
                        <input
                           type="date"
                           placeholder="Date"
                           name="date"
                           value={dueDate}
                           onChange={(e) => setDueDate(e.target.value)}
                        />
                     </div>
                     <div className="field">
                        <input
                           type="time"
                           placeholder="Time"
                           name="time"
                           value={dueTime}
                           onChange={(e) => setDueTime(e.target.value)}
                        />
                     </div>
                  </div>
               </div>

               <hr/>
               <Button
                  className="custom-button dark span"
                  onClick={() => setPollType(0)}
                  type="submit">
                  Create Poll
               </Button>
            </form>
            {
               error && ( userName === ''
                  || meetingName === ''
                  || dueDate === ''
                  || dueTime === '')
                  ?
                  <div
                     className="ui error message"
                     style={{textAlign: "center", padding: "0.25rem 0.25rem", marginTop: "0.5rem"}}
                  >
                     {  userName
                           ? null
                           : <p>Please enter your name</p> }
                     {  meetingName
                           ? null
                           : <p>Please enter a meeting name</p> }
                     {  dueDate
                           ? null
                           : <p>Please enter a due date</p> }
                     {  dueTime
                           ? null
                           : <p>Please enter a due time</p> }
                  </div>
                  : null
            }
         </div>
      </Card>
   );
};

export default CreateMeetingDetails;
