import React from 'react';
import FeatureDescriptions from './FeatureDescriptions';
import Link from '../router/Link';
import Button from './Button';
import '../css/LandingPage.css';

const LandingPage = () => {
  return(

      <div className="ui stackable grid" style={{paddingTop: "5%"}}>
        <div className="row">
          <div className="seven wide column" style={{paddingLeft:"5%"}}>
            <div className="greeting">
              <h1>
                <div className="ui header two column row">
                  Welcome to meeting
                  <div className="left aligned column" style={{color: "#45A29E"}}> maker </div>
                </div>
              </h1>
              <h4>
                {"Schedule meetings faster than ever, "}
               <b>no login required.</b>
              </h4>
              <div className="greeting-buttons">

                <Link href="/create">
                  <Button className="custom-button landing dark" fontSize="28px">Schedule a Meeting</Button> {' '}
                </Link>

                <Link href="/join">
                  <Button className="custom-button landing dark" >Join a Meeting</Button>
                </Link>

              </div>
            </div>
          </div>

          <div className="nine wide left aligned column" style={{paddingRight: "20rem"}}>
            <FeatureDescriptions>
            </FeatureDescriptions>
          </div>

        </div>
      </div>

  );
};

export default LandingPage;
