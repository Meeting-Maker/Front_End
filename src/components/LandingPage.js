import React from 'react';
import FeatureDescriptions from './FeatureDescriptions';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import '../css/LandingPage.css';
import Link from './Link';


const LandingPage = () => {

  return(

      <Container fluid>
        <Row>
          <Col xl={5}>
            <div className="greeting">
              <h1 style={{fontSize: 48}}>
                Welcome to
                <a className="greeting-title" style={{color: "black"}}> meeting</a>
                <a className="greeting-title" style={{color: "#45A29E"}}>maker</a>
              </h1>
              <h4>
                Schedule meetings faster than ever,
                <a> <b>no login required.</b></a>
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
