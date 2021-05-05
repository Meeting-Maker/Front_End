import React, {useState} from 'react';
import Button from './Button';
import Link from '../router/Link';
import Card from './Card';
import {customAlphabet} from 'nanoid';

const CreateMeetingDetails = ({currentUser, setCurrentUser, setMeetingDetails}) => {
   const [userName, setUserName] = useState('');
   const [meetingName, setMeetingName] = useState('');
   const [meetingDescription, setMeetingDescription] = useState('');
   const [dueDate, setDueDate] = useState('');
   const [dueTime, setDueTime] = useState('');
   const [pollType, setPollType] = useState(0);

   const onCreateMeetingDetails = (event) => {
      event.preventDefault();

      setCurrentUser(userName);

      const meetingDetail = {
         name: userName,
         meetingID: customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6)(),
         title: meetingName,
         description: meetingDescription,
         dueDate: dueDate + 'T' + dueTime + ':00',
         pollType: pollType
      };

      console.log(meetingDetail);
      setMeetingDetails(meetingDetail);
   };

   return (
      <Card width="40%">
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
                     value={meetingName}
                     onChange={(e) => setMeetingName(e.target.value)}
                  />
               </div>

               <div className="field">
                  <label className="left aligned">Description</label>
                  <input
                     as="textarea"
                     placeholder="Description"
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
                           value={dueDate}
                           onChange={(e) => setDueDate(e.target.value)}
                        />
                     </div>
                     <div className="field">
                        <input
                           type="time"
                           placeholder="Time"
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
         </div>
      </Card>
   );
};

export default CreateMeetingDetails;
