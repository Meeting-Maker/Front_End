import React, {useEffect, useState} from 'react';
import Button from './Button';
import Card from './Card';
import FormValidation, {validateForm} from "./FormValidation";

const CreateMeetingDetails = ({currentGuest, setCurrentGuest, meetingID, setMeetingDetails}) => {
   const [userName, setUserName] = useState('');
   const [meetingName, setMeetingName] = useState('');
   const [meetingDescription, setMeetingDescription] = useState('');
   const [dueDate, setDueDate] = useState('');
   const [dueTime, setDueTime] = useState('');
   const [pollType, setPollType] = useState(0);

   //states for form validation
   const [submitFlag, setSubmitFlag] = useState(false);
   const [valid, setValid] = useState(false);
   const [submitted, setSubmitted] = useState(false);


   useEffect(
      () => {
         async function loadUserName() {
            if (currentGuest.name) {
               await setUserName(currentGuest.name);
            }
         }

         loadUserName();
      }, [currentGuest]
   );

   const config = [
      {
         field: {
            value: userName,
            name: 'Your Name',
            minLength: 2,
         }
      },
      {
         field: {
            value: meetingName,
            name: 'Meeting Name',
            minLength: 4,
         }
      },
      {
         field: {
            value: meetingDescription,
            name: 'Meeting Description',
         }
      },
      {
         field: {
            value: dueDate + 'T' + dueTime,
            name: 'Response Needed By',
            minLength: 0,
            requiredFuture: true,
         }
      },
   ];

   const onCreateMeetingDetails = async (event) => {
      event.preventDefault();
      setSubmitFlag(!submitFlag);
      setSubmitted(true);

      await validateForm(config).then(response => {
         if (response.length === 0) {
            setCurrentGuest({
               id: currentGuest.id,
               name: userName
            });

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
         } else {
            setValid(false);
         }
      });

   };

   return (
      <Card width="50rem" padding="10rem 0 0 0">

         <div className="content">
            <div className="header">
               Create Your Meeting
            </div>
         </div>

         <div className="content">
            <form className="ui large form" onSubmit={(e) => onCreateMeetingDetails(e)}>
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
                  <label className="left aligned">Description (optional) </label>
                  <input
                     as="textarea"
                     placeholder="Meeting details, location, etc."
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
               !valid && submitted
                  ?
                  <FormValidation
                     config={config}
                     submitFlag={submitFlag}>
                  </FormValidation>
                  : null
            }
         </div>
      </Card>
   );
};

export default CreateMeetingDetails;
