import React from 'react';
import FeatureDescriptions from './FeatureDescriptions';
import {Container, Row, Col} from 'react-bootstrap';
import '../css/LandingPage.css';
import Link from './Link';
import Button from './Button';


const LandingPage = () => {

  return(

      <Container fluid>
        <Row>
          <Col xl={5}>
            <div className="greeting">
              <h1 style={{fontSize: 48}}>
              <Row className="">
                Welcome to meeting 
                <Col style={{padding: '0', color: "#45A29E"}}> maker </Col>
              </Row>
              </h1>
              <h4>
                Schedule meetings faster than ever,
                <a> <b>no login required.</b></a>
              </h4>
              <div className="greeting-buttons">
              <Link href="/create-meeting">
                <Button className="button dark landing" text="Schedule a Meeting" fontSize="28px"></Button> {' '}
              </Link>
              <Link href="/join-meeting">
                <Button className="button dark landing" text="Join a Meeting">  </Button>
              </Link>
              </div>
            </div>
          </Col>
          <Col xl={7}>
            <FeatureDescriptions>
            </FeatureDescriptions>
          </Col>
        </Row>
      </Container>



  );

};

export default LandingPage;
