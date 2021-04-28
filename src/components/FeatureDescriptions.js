import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import '../css/FeatureDescriptions.css';

const FeatureDescription = () => {

  return(
    <div className="descriptions">
      <Container>
        <Row>
          <Col xl={2}>
          </Col>
          <Col xl={8}>
            <h3>Find the best meeting time for everyone</h3>
            <p>
              Meeting Maker lets you find the best meeting time for everyone.
              Simply share your meeting with others and they can RSVP with what
              time works best for them.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xl={2}>
          </Col>
          <Col xl={4}>
            <h4>Poll</h4>
            <p>
              Create options for another person to choose from.
            </p>
          </Col>
          <Col xl={5}>
            <h4>Find Common Availability</h4>
            <p>
              Have everyone fill in their availability, and we will present the
              best times for your meeting.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xl={2}>
          </Col>
          <Col xl={10}>
            <h3>Calandar Integration </h3>
            <p>
              Export your meeting to your favourite calendar.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xl={2}>
          </Col>
          <Col xl={10}>
            <h3>Teams</h3>
            <p>
              Add others to your team to streamline future scheduling.
            </p>
          </Col>
        </Row>
        <Row>
          <Col xl={2}>
          </Col>
          <Col xl={9}>
            <h3>Email Notifications</h3>
            <p>
              Sign in to allow email notifications. We can let you know when
              everyone has RSVP’d or when a meeting time is decided by the
              meeting leader.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );

};

export default FeatureDescription;
