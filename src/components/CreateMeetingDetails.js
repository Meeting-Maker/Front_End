import React, {useEffect, useState} from 'react';
import Button from './Button';
import Card from './Card';
import {isFutureDate, isValidLength} from "../services/FormValidation";
import ErrorList from "./ErrorList";
import {redirect} from "../services/Redirect";
import Tooltip from "./Tooltip";

const CreateMeetingDetails = ({
                                 meetingDetails,
                                 currentGuest,
                                 onUpdateGuest,
                                 meetingID,
                                 onCreateMeeting,
                                 captureUserName
                              }) => {
   const [userName, setUserName] = useState('');
   const [meetingName, setMeetingName] = useState('');
   const [meetingDescription, setMeetingDescription] = useState('');
   const [dueDate, setDueDate] = useState('');
   const [dueTime, setDueTime] = useState('');
   //states for form validation
   const [formErrors, setFormErrors] = useState([]);

   useEffect(
      () => {
         if (!meetingDetails) return;
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
         if (captureUserName) loadUserName();
      }, [currentGuest]
   );

   const validateMeetingDetails = () => {
      let tempErrors = [];

      if (captureUserName && !isValidLength({
            value: userName,
            minLength: 2
         }
      )) tempErrors.push('Your Name must be at least 2 characters long.');

      if (!isValidLength(
         {
            value: meetingName,
            minLength: 4
         }
      )) tempErrors.push('Meeting Name must be at least 4 characters long.');

      if (!isValidLength({
         value: dueDate,
         minLength: 10
      }) || !isValidLength({
         value: dueTime,
         minLength: 5
      })
      ) {
         tempErrors.push('Please enter a valid Response Date and Time.');
      } else if (!isFutureDate(
         {
            dateTtime: dueDate + 'T' + dueTime + ':00'
         }
      )) tempErrors.push('Response date has already passed.');

      return tempErrors;
   };

   const onCreateMeetingDetails = async (event) => {
      event.preventDefault();
      const tempErrors = validateMeetingDetails();

      if (tempErrors.length === 0) {
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
      }
      //always set form errors to tempErrors.
      // otherwise you get the previous errors still rendering
      setFormErrors(tempErrors);

   };

   return (
      <div className="ui container" style={{width: "50rem", paddingBottom: "1em"}}>
         <div className="ui centered fluid card" style={{}}>
            <div className="content">
               <div className="header">
                  Create Your Meeting
                  <span className={"right floated"}>
               <Tooltip top={"-0.25%"} left={"102%"} width={"14rem"}>
                  Enter your meeting information and the date/time you need others' responses by.
               </Tooltip>
            </span>
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
                        type="button"
                        onClick={() => redirect('/')}
                     >Cancel
                     </Button>
                     {' '}
                     <Button
                        className="custom-button dark"
                        onClick={(e) => onCreateMeetingDetails(e)}
                     >
                        Create Poll
                     </Button>
                  </div>
               </form>
               <ErrorList
                  errors={formErrors}/>
            </div>
         </div>

      </div>
   );
};

export default CreateMeetingDetails;
