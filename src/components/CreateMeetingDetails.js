import React, {useEffect, useState} from 'react';
import Button from './Button';
import Card from './Card';
import {customAlphabet} from 'nanoid';
import FormValidation from "./FormValidation";

const CreateMeetingDetails = ({guestID, setGuestID, meetingID, setMeetingDetails}) => {
    const [userName, setUserName] = useState('');
    const [meetingName, setMeetingName] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [pollType, setPollType] = useState(0);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [renderErrors, setRenderErrors] = useState(false);
  
     useEffect(
      () => {
         async function loadUserName() {
            if(guestID){
               await setUserName(guestID);
            }
         }
         loadUserName();
      }, [guestID]
   );

    const config = [
        {
            field: {
                value: userName,
                name: 'Your Name',
                minLength: 0,
            }
        },
        {
            field: {
                value: meetingName,
                name: 'Meeting Name',
                minLength: 0,
            }
        },
        {
            field: {
                value: meetingDescription,
                name: 'Meeting Description',
            }
        },
        {
            field: {
                value: dueDate + 'T' + dueTime,
                name: 'Response Needed By',
                minLength: 0,
                requiredFuture: true,
            }
        },
    ];

    const onCreateMeetingDetails = (event) => {
        event.preventDefault();
        setRenderErrors(true);

        setSubmitFlag(!submitFlag);

        if(!renderErrors){
            setGuestID(userName);

            const meetingDetail = {
                name: userName,
                meetingID: meetingID,
                title: meetingName,
                description: meetingDescription,
                dueDate: dueDate + 'T' + dueTime + ':00',
                pollType: pollType
            };
            console.log(meetingDetail);
            setMeetingDetails(meetingDetail);
        }
    };

    return (
        <Card width="40%" padding="10rem 0 0 0">

            <div className="content">
                <div className="header">
                    Create Your Meeting
                </div>
            </div>

            <div className="content">
                <form className="ui large form" onSubmit={(e) => onCreateMeetingDetails(e)}>
                    <div className="field">
                        <label className="left aligned">Your Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            name="meetingCreatorName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label className="left aligned">Meeting Name</label>
                        <input
                            type="text"
                            placeholder="Meeting Name"
                            name="meetingName"
                            value={meetingName}
                            onChange={(e) => setMeetingName(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label className="left aligned">Description</label>
                        <input
                            as="textarea"
                            placeholder="Description"
                            name="description"
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
                                    name="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="time"
                                    placeholder="Time"
                                    name="time"
                                    value={dueTime}
                                    onChange={(e) => setDueTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <hr/>
                    <Button
                        className="custom-button dark span"
                        onClick={() => setPollType(0)}
                        type="submit">
                        Create Poll
                    </Button>
                </form>
                {
                    renderErrors
                        ?
                        <FormValidation
                            config={config}
                            submitFlag={submitFlag}
                        setRenderErrors={setRenderErrors}>
                        </FormValidation>
                        : null
                }
            </div>
        </Card>
    );
};

export default CreateMeetingDetails;
