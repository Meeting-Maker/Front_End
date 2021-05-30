import React, {useState} from 'react';
import Button from './Button';
import Card from './Card';
import '../css/CreateCandidateMeetings.css';
import {createCandidateMeeting} from "../services/CandidateMeeting";
import {redirect} from "../services/Redirect";
import {isFutureDate, isValidLength} from "../services/FormValidation";
import ErrorList from "./ErrorList";
import useWindowDimensions from "../hooks/useWindowDimensions";

//todo: create structure for candidateMeeting based on database schema
//todo: rename minutes variable to ~length
//todo: fix concat to append new option to candidateList
//todo: onCreateMeeting does not prevent default / causes error. return list to parent component with onFormSubmit

const CreateCandidateMeetings = ({meetingID, candidateMeetings, setCandidateMeetings}) => {
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [length, setLength] = useState(0);

   //states for form validation
   const [submitFlag, setSubmitFlag] = useState(false);
   const [formErrors, setFormErrors] = useState([]);

   const validateCandidateMeeting = () => {
      let tempErrors = [];

      if (!isValidLength({
         value: date,
         minLength: 10
      }) || !isValidLength({
         value: time,
         minLength: 5
      })
      ) {
         tempErrors.push('Please enter a valid meeting date and time.');
      } else if (!isFutureDate(
         {
            dateTtime: date + 'T' + time + ':00'
         }
      )) tempErrors.push('Meeting date has already passed.');

      console.log('returning: ', tempErrors);
      return tempErrors;
   };

   //called when the 'Add Option' button is clicked
   const onAddOption = async () => {
      setSubmitFlag(!submitFlag);
      const tempErrors = validateCandidateMeeting();

      if (tempErrors.length === 0) {
         const option = {
            start: date + 'T' + time + ':00',
            end: date + 'T' + time + ':00',
            length: length,
            meetingID: meetingID
         };

         //reset length - intentionally leave same date and time
         setLength(0);

         //if meeting with same details already exists
         if (!candidateListHasDuplicate(candidateMeetings, option)) {
            onCreateCandidateMeeting(option);
         }
      } else {
         setFormErrors(tempErrors)
      }

   };

   const onCreateCandidateMeeting = (candidateMeeting) => {
      createCandidateMeeting(candidateMeeting).then((response) => {
         setCandidateMeetings(old => [...old, response.data]);
      });
   };

   //called when the 'Create Meeting' button is clicked
   //verifies that at least 2 candidates exist
   const onFormSubmit = (event) => {
      event.preventDefault();
      if (candidateMeetings.length < 2) {
         console.error('You need at least two candidates to create a meeting.');
      } else {
         redirect('/meeting', [
            {key: 'meetingID', value: meetingID}
         ]);
      }
   };

   const onChangeLength = (input) => {
      let val;
      switch (input) {
         case 'plus':
            val = length + 5;
            break;
         case 'minus':
            val = length - 5;
            break;
         default:
            val = input;
            break;
      }

      if (val % 5 !== 0) {
         val = (Math.floor(val / 5) + 1) * 5;
      }
      setLength(val);
   };

   const candidateListHasDuplicate = (list, JSON) => {
      for (let i = 0; i < list.length; i++) {
         if (
            list[i].start === JSON.start &&
            list[i].length === JSON.length) {
            return true;
         }
      }
      return false;
   }

   return (
      <Card width="32rem" padding="2rem 0 0 0">
         <div className="content">
            <div className="header" style={{textAlign: "center"}}>
               Create Vote Options
            </div>
         </div>
         <div className="content">
            <form id="createCandidateMeetingsForm"
                  className="ui large form"
                  onSubmit={(e) => onFormSubmit(e)}>
               <div className="field">
                  <label className="left aligned">Meeting Date & Time</label>
                  <div className="two fields">
                     <div className="field">
                        <input
                           type="date"
                           placeholder="Meeting Date"
                           value={date}
                           onChange={(e) => setDate(e.target.value)}
                        />
                     </div>
                     <div className="field">
                        <input
                           type="time"
                           placeholder="Meeting Time"
                           value={time}
                           onChange={(e) => setTime(e.target.value)}
                        />
                     </div>
                  </div>
               </div>

               <div className="field ui container" style={{width: "100%", padding: "0"}}>
                  <label className="left aligned">Length (Minutes)</label>

                  <span className={"ui icon input"}>
                     <span className={"ui ignored icon font buttons"}>
                        <a id="minus" className={"decrease ui button"}
                           style={{
                              padding: "14px 11px 0 11px",
                              borderTopRightRadius: "0",
                              borderBottomRightRadius: "0"
                           }}
                           onClick={() => onChangeLength('minus')}>
                           <i id="minus" className={"minus icon"}/>
                        </a>
                     </span>

                     <input
                        type="number"
                        placeholder="Length (minutes)"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        onBlur={() => onChangeLength(length)}
                        style={{borderRadius: "0"}}
                     />

                     <span className={"ui ignored icon font buttons"}>
                        <a id="plus" className={"increase ui button"}
                           style={{
                              padding: "14px 11px 0 11px",
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0"
                           }}
                           onClick={() => onChangeLength('plus')}>
                           <i id="plus" className={"plus icon"}/>
                        </a>
                     </span>
                  </span>

               </div>

               <div style={{textAlign: "center"}}>
                  <Button
                     className="custom-button dark thin"
                     onClick={() => redirect('/')}
                     type="button"
                  >
                     Cancel
                  </Button>{' '}
                  <Button
                     className="custom-button dark thin"
                     onClick={() => onAddOption()}
                     type="button"
                  >
                     Add Option
                  </Button>
               </div>
            </form>
            <ErrorList
               errors={formErrors}/>
         </div>
      </Card>
   );
};

export default CreateCandidateMeetings;