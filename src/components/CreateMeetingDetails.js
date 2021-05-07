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

   //array of errors to be printed
   const [errors, setErrors] = useState([]);

   const onCreateMeetingDetails = (event) => {
      event.preventDefault();

      console.log(errors);
      //reset the errors on each submission of the form
      setErrors([]);

      //if statement to check for errors within the form
      if(
        userName === '' ||
        meetingName === '' ||
        meetingDescription === '' ||
        dueTime === ''
      ){
        errors.push(<p>Please check form.</p>);
        console.log(errors);

        //if statement to check for date errors -- does not work
      }else if(dueDate.getTime() < Date.now() || dueDate === ''){
        errors.push(<p>Please make sure the date is in the future.</p>);
        console.log(errors);

      }else{
        console.log(errors);

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
      }
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

            { //check to see if there are errors and then print them
              errors.length > 0
              ?
              <div
               className="ui error message"
               style={{textAlign: "center", padding: "0.25rem 0.25rem", marginTop: "0.5rem"}}
              >
              {errors.map(error => error)}
              </div>
              :
              ' '
            }

         </div>
      </Card>
   );
};

export default CreateMeetingDetails;
