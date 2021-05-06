import React from 'react';
import FeatureDescriptions from './FeatureDescriptions';
import Link from '../router/Link';
import Button from './Button';
import '../css/LandingPage.css';

const LandingPage = () => {
  return(

      <div className="ui stackable grid">
        <div className="row">
          <div className="seven wide right floated left aligned column" >
            <div className="greeting">
              <div className="ui grid" style={{width: "80%"}}>

                <h1 className="ui header" style={{fontSize: "0.9em", margin: "0"}}>
                  <div className="two column row" >
                    <div className="six wide right floated column">
                      Welcome to meeting
                    </div>
                    <div className="eight wide left aligned column" style={{color: "#45A29E"}}> maker </div>
                  </div>
                </h1>

                <h4 style={{paddingLeft: "0"}}>
                  {"Schedule meetings faster than ever, "}
                 <b>no login required.</b>
                </h4>

                <div className="greeting-buttons" style={{paddingLeft: "0", margin: "0"}}>
                  <Link href="/create">
                    <Button className="custom-button landing dark" fontSize="28px">Schedule a Meeting</Button> {' '}
                  </Link>

                  <Link href="/join">
                    <Button className="custom-button landing dark" >Join a Meeting</Button>
                  </Link>
                </div>

                </div>
            </div>
          </div>

          <div className="eight wide left aligned column" style={{paddingRight: "20rem"}}>
            <FeatureDescriptions>
            </FeatureDescriptions>
          </div>


    <div className="ui container" style={{margin: "auto", width: "50%", padding: "10rem 0 0 0"}}>
      <div className="ui container greeting" style={{padding: "0"}}>

        <div className="ui header" style={{fontSize: "0.9em", margin: "0"}}>
              Welcome to meeting
            <span className="" style={{color: "#45A29E", display: "inline-block"}}> maker </span>
        </div>

        <h4 style={{paddingLeft: "0", textAlign: "center"}}>
          {"Schedule meetings faster than ever, "}
            <b>no login required.</b>
        </h4>
      </div>

      <div className="ui container" style={{margin: "1em 0 0 0", padding: "0", textAlign: "center"}}>
        <span style={{paddingRight: "0.5rem"}}>
          <Link href="/create">
            <Button className="custom-button thick dark" fontSize="28px">Schedule a Meeting</Button>
          </Link>
        </span>
        {' '}
        <span>
          <Link href="/join" overflow="hidden">
            <Button className="custom-button thick dark" >Join a Meeting</Button>
          </Link>
        </span>
      </div>
    </div>


  );
};

export default LandingPage;
