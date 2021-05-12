import React, {useState} from 'react';
import Button from './Button';
import Card from './Card';
import '../css/CreateCandidateMeetings.css';
//todo: create structure for candidateMeeting based on database schema
//todo: rename minutes variable to ~length
//todo: fix concat to append new option to candidateList
//todo: onCreateMeeting does not prevent default / causes error. return list to parent component with onFormSubmit

const CreateCandidateMeetings = ({newMeetingID, candidateMeetings, onCreateMeeting, onCreateCandidateMeeting}) => {
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [length, setLength] = useState(0);
   const [error, setError] = useState(false);

   //called when the 'Add Option' button is clicked
   const onAddOption = () => {
      if (
         date === ''
         || time === ''
         || length < 15
      ) {
         setError(true);
         return;
      } else {
         setError(false);
      }

      const option = {
         start: date + 'T' + time + ':00',
         end: date + 'T' + time + ':00',
         length: length,
         meetingID: newMeetingID
      };

      if (!isValidCandidate(option)) return false;

      //reset length - intentionally leave same date and time
      setLength(0);

      //if meeting with same details already exists
      if (candidateListHasOption(candidateMeetings, option)) {
         console.error('candidate already exists');
      } else {
         onCreateCandidateMeeting(option);
      }
   };

   //called when the 'Create Meeting' button is clicked
   //verifies that at least 2 candidates exist
   const onFormSubmit = (event) => {
      event.preventDefault();
      if (candidateMeetings.length < 2) {
         console.error('You need at least two candidates to create a meeting.');
      } else {
         //todo: use service file to create time values compatible with db
         onCreateMeeting();
      }
   }

   const onChangeLength = (input) => {
      let val;
      switch(input){
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

      if(val % 5 !== 0){
         val = (Math.floor(val /5) + 1) * 5;
      }

      setLength(val);
   }

   return (
      <Card width="30rem" padding="2rem 0 0 0">

         <div className="content">
            <div className="header">
               Create Your Meeting
            </div>
         </div>

         <div className="content">
            <form className="ui large form" onSubmit={(e) => onFormSubmit(e)}>
               <div className="field">
                  <label className="left aligned">Meeting Date</label>
                  <input
                     type="date"
                     placeholder="Meeting Date"
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     required
                  />
               </div>

               <div className="field">
                  <label className="left aligned">Time</label>
                  <input
                     type="time"
                     placeholder="Meeting Time"
                     value={time}
                     onChange={(e) => setTime(e.target.value)}
                     required
                  />
               </div>

               <div className="field ui container" style={{width: "100%", padding: "0"}}>
                  <label className="left aligned">Length (Minutes)</label>

                  <span className={"ui icon input"}>
                     <span className={"ui ignored icon font buttons"}>
                        <a id="minus" className={"decrease ui button"}
                           style={{padding: "14px 11px 0 11px",
                              borderTopRightRadius: "0",
                              borderBottomRightRadius: "0"}}
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
                           style={{padding: "14px 11px 0 11px",
                              borderTopLeftRadius: "0",
                              borderBottomLeftRadius: "0"}}
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
               error && (date === ''
                  || time === ''
                  || length < 5)
                  ?
                  <div
                     className="ui error message"
                     style={{textAlign: "center", padding: "0.25rem 0.25rem", marginTop: "0.5rem"}}
                  >
                     {date
                        ? null
                        : <p>Please enter a meeting date.</p>}
                     {time
                        ? null
                        : <p>Please enter a meeting time.</p>}
                     {length >= 5
                        ? null
                        : <p>Please enter a meeting length > 5 minutes</p>}
                  </div>
                  : null
            }
         </div>
      </Card>


   );
};

function isValidCandidate(candidateMeeting) {
   //if no date has been entered
   if (candidateMeeting.date === '') {
      console.error('please enter a date');
      return false;
   }

   //if no time has been entered
   if (candidateMeeting.time === '') {
      console.error('please enter a time');
      return false;
   }

   //check for length
   if (candidateMeeting.length === '') {
      console.error('please enter a length');
      return false;
   }

   //check for length > 0
   if (candidateMeeting.length === 0) {
      console.error('candidate cant have length 0');
      return false;
   }

   //ensure event starts in future
   //is valid
   return true;
}

function candidateListHasOption(list, JSON) {
   for (var i = 0; i < list.length; i++) {
      if (optionsAreEqual(list[i], JSON)) {
         return true;
      }
   }
   return false;
}

function optionsAreEqual(option1, option2) {
   return option1.date === option2.date && option1.time === option2.time && option1.length === option2.length
}

export default CreateCandidateMeetings;
