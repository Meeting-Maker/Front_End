import React, {useState, useEffect} from 'react';
import Button from './Button';
import Card from './Card';
import FormValidation, {validateForm} from './FormValidation';


//todo: conditionally render userName field, only if user is not logged in

const CodeInput = ({onCodeSubmit, meetingIDFromParam}) => {
    const [joinCode, setJoinCode] = useState('');
    const [submitFlag, setSubmitFlag] = useState(false);
    const [valid, setValid] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(
       () => {

       }, [joinCode]
    );

    useEffect(
       () => {
           if(meetingIDFromParam){
               setJoinCode(meetingIDFromParam);
               setSubmitted(true);
               setSubmitFlag(!submitFlag);
           }
           // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [meetingIDFromParam]
    );

    const config = [
        {
            field: {
                value: joinCode,
                name: 'Meeting Code',
                minLength: 6,
            }
        }
    ]

    const onFormSubmit = async (event) => {
        event.preventDefault();
        setSubmitFlag(!submitFlag);
        setSubmitted(true);

        await validateForm(config).then(response => {
            if(response.length === 0){
                onCodeSubmit(joinCode);
            }else{
                setValid(false);
            }
        });
    }

    return (
        <Card width="20rem" padding="5rem 0 0 0">
            <div className="content">
                <form className="ui large form" onSubmit={e => onFormSubmit(e)}>
                    <div className="field" style={{marginBottom: "0.5rem"}}>
                        <input
                            style={{fontSize: "2em", padding: "0", textAlign: "center"}}
                            maxLength="6"
                            type="text"
                            placeholder="Code"
                            value={joinCode}
                            onChange={e => setJoinCode(e.target.value)}
                        />
                    </div>
                    <Button
                        className="custom-button dark span"
                        type="submit"
                    >
                        Join
                    </Button>
                </form>
                {
                    !valid && submitted
                        ?
                        <FormValidation
                            config={config}
                            submitFlag={submitFlag}>
                        </FormValidation>
                        : null
                }
            </div>
        </Card>
    );
};

export default CodeInput;
