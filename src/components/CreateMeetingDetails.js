import React, {useState} from 'react';
import Button from './Button';
import Link from './Link';
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
     <div className="ui centered grid" style={{paddingTop: "10rem"}}>
      <div className="ui container" style={{width: "25%"}}>
        <div className="ui grey fluid card">

          <div className="content">
            <div className="header">
              Create Your Meeting
            </div>
          </div>

          <div className="content">
            <form className="ui large form" onSubmit={(e) => onSelectPollType(e)}>
              {
                user.userID
                  ?
                  null
                  :
                  <div className="field">
                    <label className="left aligned">Your Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
              }
                  <div className="field">
                     <label className="left aligned">Meeting Name</label>
                     <input
                        type="text"
                        placeholder="Meeting Name"
                        value={meetingName}
                        onChange={(e) => setMeetingName(e.target.value)}
                     />
                  </div>

                  <div className="field">
                     <label className="left aligned">Description</label>
                     <input
                        as="textarea"
                        placeholder="Description"
                        value={meetingDescription}
                        onChange={(e) => setMeetingDescription(e.target.value)}
                     />
                  </div>

                  <div className="field">
                    <label className="left aligned">Response Needed By</label>
                    <div className="two fields">
                      <div className="field">
                        <input
                          type="date"
                          placeholder="Date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <input
                          type="time"
                          placeholder="Time"
                          value={dueTime}
                          onChange={(e) => setDueTime(e.target.value)}
                        />
                    </div>
                  </div>
                </div>
                <hr></hr>
              <div>
                <Link href="">
                  <Button
                    className="custom-button dark span"
                    onClick={() => setPollType(0)}
                    type="submit">
                    Create Poll
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="">
                  <Button
                    disabled="true"
                    className="custom-button dark span disabled"
                    onClick={() => setPollType(1)}
                    type="submit"
                    style={{marginTop: "1rem"}}>
                     Compare Availability
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
     </div>

   );

};

export default CreateMeetingDetails;
