import React, { useState } from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

//todo: create structure for candidateMeeting based on database schema
//todo: rename minutes variable to ~length
//todo: fix concat to append new option to candidateList
//todo: onCreateMeeting does not prevent default / causes error. return list to parent component with onFormSubmit

const CreateCandidateMeetings = ({candidateMeetings, onFormSubmit}) => {
   const [candidateList, setCandidateList] = useState(candidateMeetings);
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [minutes, setMinutes] = useState(null);

   //called when the 'Add Option' button is clicked
   const onAddOption = (option) => {
      setCandidateList(candidateList.concat(option));
      console.log(candidateList);
   };

   //called when the 'Create Meeting' button is clicked
   const onCreateMeeting = (event) => {
      event.preventDefault();

      //updates candidateMeetings in parent component
      onFormSubmit(candidateList);
   }

   return (
     <div>
        <h1>Create Your Meeting</h1>
        <Card style={{ width: '32rem' }}>
           <Card.Body>
              <Form onSubmit={(e) => onCreateMeeting(e)} >
                 <Form.Group>
                    <Form.Label>Meeting Date (picker)</Form.Label>
                    <Form.Control
                       type="date"
                       placeholder="Meeting Date"
                       value={date}
                       onChange={(e) => setDate(e.target.value)}
                    />
                 </Form.Group>
                 <Form.Group>
                    <Form.Label>Meeting Date (picker)</Form.Label>
                    <Form.Control
                       type="time"
                       placeholder="Meeting Time"
                       value={time}
                       onChange={(e) => setTime(e.target.value)}
                    />
                 </Form.Group>
                 <Form.Group>
                    <Form.Label>Meeting Date (picker)</Form.Label>
                    <Form.Control
                       type="text"
                       placeholder="Length (minutes)"
                       value={minutes}
                       onChange={(e) => setMinutes(e.target.value)}
                    />
                 </Form.Group>
                 <Button onClick={() => onAddOption({date: date, time: time, minutes: minutes})} variant="primary">
                    Add Option
                 </Button>
                 <Button onSubmit={(e) => onCreateMeeting(e.target.value)} variant="primary" type="submit">
                    Create Meeting
                 </Button>
              </Form>
           </Card.Body>
        </Card>
     </div>
   );
};

export default CreateCandidateMeetings;