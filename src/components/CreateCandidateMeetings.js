import React, {useEffect, useState} from 'react';
import Button from './Button';
import Card from './Card';
//todo: create structure for candidateMeeting based on database schema
//todo: rename minutes variable to ~length
//todo: fix concat to append new option to candidateList
//todo: onCreateMeeting does not prevent default / causes error. return list to parent component with onFormSubmit

const CreateCandidateMeetings = ({candidateMeetings, onCreateMeeting, onCreateCandidateMeeting}) => {
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [length, setLength] = useState(0);

   useEffect(
      () => {

      },
      [candidateMeetings]
   );

   //called when the 'Add Option' button is clicked
   const onAddOption = (event) => {
      event.preventDefault();

      const option = {date: date, time: time, length: length};

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
   const onFormSubmit = () => {
      if (candidateMeetings.length < 2) {
         console.error('You need at least two candidates to create a meeting.');
      } else {
         onCreateMeeting();
      }
   }

   return (
      <Card width="25%">
         <div className="content">
            <div className="header">
               Create Your Meeting
            </div>
         </div>

         <div className="content">
            <form className="ui large form" onSubmit={(e) => onAddOption(e)}>
               <div className="field">
                  <label className="left aligned">Meeting Date</label>
                  <input
                     type="date"
                     placeholder="Meeting Date"
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                  />
               </div>

               <div className="field">
                  <label className="left aligned">Time</label>
                  <input
                     type="time"
                     placeholder="Meeting Time"
                     value={time}
                     onChange={(e) => setTime(e.target.value)}
                  />
               </div>

               <div className="field">
                  <label className="left aligned">Length</label>
                  <input
                     type="text"
                     placeholder="Length (minutes)"
                     value={length}
                     onChange={(e) => setLength(e.target.value)}
                  />
               </div>

               <Button className="custom-button dark thin" onClick={(e) => onAddOption(e)}>
                  Add Option
               </Button>
               {' '}
               <Button className="custom-button dark thin" onClick={() => onFormSubmit()}>
                  Create Meeting
               </Button>

            </form>
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
