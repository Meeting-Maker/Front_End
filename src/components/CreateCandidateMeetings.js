import React, {useState} from 'react';
import Button from './Button';
import Card from './Card';
import '../css/CreateCandidateMeetings.css';
import FormValidation, {validateForm} from "./FormValidation";
import CandidateMeeting from "./CandidateMeeting";
import {createCandidateMeeting} from "../services/CandidateMeeting";

//todo: create structure for candidateMeeting based on database schema
//todo: rename minutes variable to ~length
//todo: fix concat to append new option to candidateList
//todo: onCreateMeeting does not prevent default / causes error. return list to parent component with onFormSubmit

const CreateCandidateMeetings = ({newMeetingID, candidateMeetings, setCandidateMeetings}) => {
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [length, setLength] = useState(0);

   //states for form validation
   const [submitFlag, setSubmitFlag] = useState(false);
   const [valid, setValid] = useState(false);
   const [submitted, setSubmitted] = useState(false);

   const config = [
      {
         field: {
            value: date + 'T' + time,
            name: 'Meeting Date & Time',
            minLength: 0,
            requiredFuture: true,
         }
      },
      {
         field: {
            value: time,
            name: 'Meeting Time',
            minLength: 0,
         }
      },
      {
         field: {
            value: date,
            name: 'Meeting Date',
            minLength: 0,
         }
      },
      {
         field: {
            value: length,
            name: 'Length',
            minLength: 0,
            greaterThanOrEqual: 5,
         }
      },
      {
         field: {
            value: {
               start: date + 'T' + time,
               length: length,
            },
            name: 'Candidate Meeting',
            compareDuplicate: candidateMeetings
         }
      },
   ]

   //called when the 'Add Option' button is clicked
   const onAddOption = async () => {

      setSubmitFlag(!submitFlag);
      setSubmitted(true);


      await validateForm(config).then(response => {
         if (response.length === 0) {

            const option = {
               start: date + 'T' + time + ':00',
               end: date + 'T' + time + ':00',
               length: length,
               meetingID: newMeetingID
            };

            //reset length - intentionally leave same date and time
            setLength(0);

            //if meeting with same details already exists
            if (!candidateListHasDuplicate(candidateMeetings, option)) {
               onCreateCandidateMeeting(option);
            }

         } else {
            setValid(false);
         }
      });

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
      if (candidateMeetings.length >= 2) {
         //todo: use service file to create time values compatible with db
         window.history.pushState(
            {},
            '',
            '/meeting?meetingID=' + newMeetingID
         );
         const navEvent = new PopStateEvent('popstate');
         window.dispatchEvent(navEvent)
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
            list[i].length === JSON.length)
         {
            return true;
         }
      }
      return false;
   }

   return (
      <Card width="32rem" padding="2rem 0 0 0">
         <div className="content">
            <div className="header">
               Create Your Meeting
            </div>
         </div>
         <div className="content">
            <form className="ui large form" onSubmit={(e) => onFormSubmit(e)}>
               <div className="field">
                  <label className="left aligned">Meeting Date & Time</label>
                  <div className="two fields">
                     <div className="field">
                        <input
                           type="date"
                           placeholder="Meeting Date"
                           value={date}
                           onChange={(e) => setDate(e.target.value)}
                           required
                        />
                     </div>
                     <div className="field">
                        <input
                           type="time"
                           placeholder="Meeting Time"
                           value={time}
                           onChange={(e) => setTime(e.target.value)}
                           required
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
                     onClick={() => onAddOption()}
                     type="button"
                  >
                     Add Option
                  </Button>
                  {' '}
                  <Button
                     className="custom-button dark thin"
                     onClick={(e) => onFormSubmit(e)}
                     type="submit"
                  >
                     Create Meeting
                  </Button>
               </div>
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

export default CreateCandidateMeetings;