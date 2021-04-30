import React, {useState} from 'react';
import {Card, Form, Button, Container, Row, Col} from 'react-bootstrap';

const CreateMeetingDetails = ({user, onFormSubmit}) => {
   const [userName, setUserName] = useState('');
   const [meetingName, setMeetingName] = useState('');
   const [meetingDescription, setMeetingDescription] = useState('');
   const [pollType, setPollType] = useState(null);
   const [dueDate, setDueDate] = useState('');
   const [dueTime, setDueTime] = useState('');

   const onSelectPollType = (event) => {
      event.preventDefault();
      const meetingDetail = {
         userName: userName,
         meetingName: meetingName,
         meetingDescription: meetingDescription,
         pollType: pollType,
         dueDate: dueDate,
         dueTime: dueTime
      };
      console.log(meetingDetail);
      onFormSubmit(meetingDetail);
   };

   return (
      <div>
         <h1>Create Your Meeting</h1>
         <Card style={{width: '32rem'}}>
            <Card.Body>
               <Form onSubmit={(e) => onSelectPollType(e)}>
                  {
                     user.userID
                        ?
                        null
                        :
                        <Form.Group>
                           <Form.Label>Your Name</Form.Label>
                           <Form.Control
                              type="text"
                              placeholder="Your Name"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                           />
                           <hr/>
                        </Form.Group>

                  }
                  <Form.Group>
                     <Form.Label>Meeting Name</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Meeting Name"
                        value={meetingName}
                        onChange={(e) => setMeetingName(e.target.value)}
                     />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Meeting Description</Form.Label>
                     <Form.Control
                        as="textarea"
                        placeholder="Meeting Description"
                        value={meetingDescription}
                        onChange={(e) => setMeetingDescription(e.target.value)}
                     />
                  </Form.Group>
                  <Form.Label>Response Needed By</Form.Label>
                  <Form.Group>
                     <Form.Label>Meeting Date</Form.Label>
                     <Form.Control
                        type="date"
                        placeholder=""
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                     />
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Time</Form.Label>
                     <Form.Control
                        type="time"
                        placeholder=""
                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                     />
                  </Form.Group>
                  <hr/>
                  <Form.Group>
                     <Form.Label>Schedule Meeting Method:</Form.Label>
                     <Container>
                        <Row>
                           <Col xs={5}>
                              <Button onClick={() => setPollType(0)} variant="primary" type="submit">
                                 <p>Create</p><p>Poll</p>
                              </Button>
                           </Col>
                           <Col xs={2}>
                              or
                           </Col>
                           <Col xs={5}>
                              <Button onClick={() => setPollType(1)} variant="primary" type="submit">
                                 <p>Compare</p><p>Availability</p>
                              </Button>
                           </Col>
                        </Row>
                     </Container>
                  </Form.Group>
               </Form>
            </Card.Body>
         </Card>
      </div>

   );

};

export default CreateMeetingDetails;
