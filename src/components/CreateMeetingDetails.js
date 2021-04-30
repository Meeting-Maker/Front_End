import React, {useState} from 'react';
import {Card, Form, Button, Container, Row, Col} from 'react-bootstrap';

const CreateMeetingDetails = ({user, onFormSubmit}) => {
   const [userName, setUserName] = useState('');
   const [meetingName, setMeetingName] = useState('');
   const [pollType, setPollType] = useState(null);



   const onSelectPollType = (event) => {
      event.preventDefault();
      const title = {userName: userName, meetingName: meetingName, pollType: pollType};
      console.log(title);
      onFormSubmit(title);
   };

   return (
      <div>
         <h1>Create Your Meeting</h1>
         <Card style={{ width: '32rem' }}>
            <Card.Body>
               <Form onSubmit={(e) => onSelectPollType(e)} >
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
                     <Container>
                        <Row>
                           <Col xs={5}>
                              <Button onClick={() => setPollType(0)} variant="primary" type="submit">
                                 Create<br></br>Poll
                              </Button>
                           </Col>
                           <Col xs={2}>
                              or
                           </Col>
                           <Col xs={5}>
                              <Button onClick={() => setPollType(1)} variant="primary" type="submit">
                                 Compare Availability
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
