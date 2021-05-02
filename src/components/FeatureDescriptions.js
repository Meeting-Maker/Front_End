import React from 'react';
import '../css/FeatureDescriptions.css';

const FeatureDescription = () => {

  return(
    <div className="descriptions">
      <div className="ui grid">
        <div className="row">
          <div>
            <h3>Find the best meeting time for everyone</h3>
            <p>
              Meeting Maker lets you find the best meeting time for everyone.
              Simply share your meeting with others and they can RSVP with what
              time works best for them.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="eight wide column">
            <h4>Poll</h4>
            <p>
              Create options for another person to choose from.
            </p>
          </div>
          <div className="eight wide column">
            <h4>Find Common Availability</h4>
            <p>
              Have everyone fill in their availability, and we will present the
              best times for your meeting.
            </p>
          </div>
        </div>
        <div className="row">
          <div>
            <h3>Calandar Integration </h3>
            <p>
              Export your meeting to your favourite calendar.
            </p>
          </div>
        </div>
        <div className="row">
          <div>
            <h3>Teams</h3>
            <p>
              Add others to your team to streamline future scheduling.
            </p>
          </div>
        </div>
        <div className="row">
          <div>
            <h3>Email Notifications</h3>
            <p>
              Sign in to allow email notifications. We can let you know when
              everyone has RSVP’d or when a meeting time is decided by the
              meeting leader.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

};

export default FeatureDescription;
