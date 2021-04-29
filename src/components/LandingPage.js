import React from 'react';
import FeatureDescriptions from './FeatureDescriptions';
import {Container, Row, Col} from 'react-bootstrap';
import '../css/LandingPage.css';
import Link from '../router/Link';


const LandingPage = () => {

  return(

      <Container fluid>
        <Row>
          <Col xl={5}>
            <div className="greeting">
              <h1 style={{fontSize: 48}}>
                Welcome to meeting
                  <div style={{color: "#45A29E", display: 'inline'}}>maker</div>
              </h1>
              <h4>
                {"Schedule meetings faster than ever, "}
               <b>no login required.</b>
              </h4>
              <div className="greeting-buttons">
              <Link href="/create-meeting">
                <button className="button"> Schedule a Meeting </button> {' '}
              </Link>
              <Link href="/join-meeting">
                <button className="button"> Join a Meeting </button>
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
