import React, {useState} from 'react';
import {Card, Form, Button, Container, Row, Col} from 'react-bootstrap';
import {customAlphabet} from 'nanoid';

const CreateMeetingDetails = ({user, onFormSubmit}) => {
   const [userName, setUserName] = useState('');
   const [meetingName, setMeetingName] = useState('');
   const [meetingDescription, setMeetingDescription] = useState('');
   const [dueDate, setDueDate] = useState('');
   const [dueTime, setDueTime] = useState('');
   const [pollType, setPollType] = useState(null);

   const onSelectPollType = (event) => {
      event.preventDefault();

      const meetingDetail = {
         name: userName,
         meetingID: customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ',6)(),
         title: meetingName,
         description: meetingDescription,
         dueDate: dueDate + 'T' + dueTime + ':00',
         pollType: pollType
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
                     <Form.Label>Description</Form.Label>
                     <Form.Control
                        as="textarea"
                        placeholder="Description"
                        value={meetingDescription}
                        onChange={(e) => setMeetingDescription(e.target.value)}
                     />
                  </Form.Group>
                  <Form.Label>Response Needed By</Form.Label>
                  <Form.Group>
                     <Form.Control
                        type="date"
                        placeholder="Date"

                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                     />
                  </Form.Group>
                  <Form.Group>
                     <Form.Control
                        type="time"
                        placeholder="Time"

                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                     />
                  </Form.Group>
                  <Form.Group>

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
