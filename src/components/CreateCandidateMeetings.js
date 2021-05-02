import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import Link from "../router/Link";

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
         console.log(typeof date + ' ' + date);
         console.log(typeof time + ' ' + time);
         console.log(typeof length + ' ' + length);
      },
      [date, time, length]
   );

   //called when the 'Add Option' button is clicked
   const onAddOption = (event) => {
      event.preventDefault();

      const option = {date: date, time: time, length: length};
      console.log(option);

      if (!isValidCandidate(option)) return false;

      //reset length - intentionally leave same date and time
      setLength(0);

      //if meeting with same details already exists
      if (candidateListHasOption(candidateMeetings, option)) {
         console.error('candidate already exists');
      } else {
         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
         console.log('candidateMeetings', candidateMeetings);
         console.log('option', option);
         console.log('--------------------------------');

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
      <div>
         <h1>CreateYour Meeting</h1>
         <Card style={{width: '32rem'}}>
            <Card.Body>
               <Form onSubmit={(e) => onAddOption(e)}>
                  <Form.Group>
                     <Form.Label>Meeting Date</Form.Label>
                     <Form.Control
                        type="date"
                        placeholder="Meeting Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                     />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Time</Form.Label>
                     <Form.Control
                        type="time"
                        placeholder="Meeting Time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                     />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Length</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Length (minutes)"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                     />
                  </Form.Group>
                  <Button onClick={(e) => onAddOption(e)} variant="primary">
                     Add Option
                  </Button>
                  <Button onClick={() => onFormSubmit()} variant="primary">
                     Create Meeting
                  </Button>
               </Form>
            </Card.Body>
         </Card>
      </div>
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
   if (candidateMeeting.length == 0) {
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