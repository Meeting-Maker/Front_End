import React, {useEffect, useState} from 'react';
import Button from './Button';
import Card from './Card';
import FormValidation, {validateForm} from "./FormValidation";

const CreateMeetingDetails = ({meetingDetails, currentGuest, onUpdateGuest, meetingID, onCreateMeeting, captureUserName}) => {
   const [userName, setUserName] = useState('');
   const [meetingName, setMeetingName] = useState('');
   const [meetingDescription, setMeetingDescription] = useState('');
   const [dueDate, setDueDate] = useState('');
   const [dueTime, setDueTime] = useState('');

   //states for form validation
   const [submitFlag, setSubmitFlag] = useState(false);
   const [valid, setValid] = useState(false);
   const [submitted, setSubmitted] = useState(false);

   useEffect(
      () => {
         if(!meetingDetails) return;
         setMeetingName(meetingDetails.title);
         setMeetingDescription(meetingDetails.description);
         setDueDate(meetingDetails.dueDate.substring(0, 10));
         setDueTime(meetingDetails.dueDate.substring(11, 16));
      }, []
   );

   useEffect(
      () => {
         async function loadUserName() {
            if (currentGuest.name) {
               await setUserName(currentGuest.name);
            }
         }

         if(captureUserName) loadUserName();
      }, [currentGuest]
   );

   let config = [
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

   if(captureUserName) config.push({
      field: {
         value: userName,
         name: 'Your Name',
         minLength: 2,
      }
   });

   const onCreateMeetingDetails = async (event) => {
      event.preventDefault();
      setSubmitFlag(!submitFlag);
      setSubmitted(true);

      await validateForm(config).then(response => {
         if (response.length === 0) {
            onUpdateGuest({
               id: currentGuest.id,
               name: userName
            });

            const meetingDetails = {
               name: userName,
               meetingID: meetingID,
               title: meetingName,
               description: meetingDescription,
               dueDate: dueDate + 'T' + dueTime + ':00',
               pollType: 0
            };

            onCreateMeeting(meetingDetails);
         } else {
            setValid(false);
         }
      });
   };

   return (
      <Card width="50rem" padding="5rem 0 0 0">

         <div className="content">
            <div className="header">
               Create Your Meeting
            </div>
         </div>

         <div className="content">
            <form className="ui large form">
               {
                  captureUserName ?
                     <div className="field">
                        <label className="left aligned">Your Name</label>
                        <input
                           type="text"
                           placeholder="Your Name"
                           name="meetingCreatorName"
                           value={userName}
                           onChange={(e) => setUserName(e.target.value)}
                        />
                     </div> :
                     null
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
               <div style={{textAlign: "center"}}>
                  <Button
                     className="custom-button dark"
                     onClick={(e) => onCreateMeetingDetails(e)}
                  >
                     Create Poll
                  </Button>
                  &nbsp;
                  <Button
                     className="custom-button dark"
                     // onClick={}
                  >
                     Cancel
                  </Button>
               </div>

            </form>
            {
               !valid && submitted
                  ?
                  <FormValidation
                     config={config}
                     submitFlag={submitFlag}
                  >
                  </FormValidation>
                  : null
            }
         </div>
      </Card>
   );
};

export default CreateMeetingDetails;
