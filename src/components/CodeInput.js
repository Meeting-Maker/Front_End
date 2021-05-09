import React, {useState, useEffect} from 'react';
import Button from './Button';
import Link from '../router/Link';
import Card from './Card';
import FormValidation from './FormValidation';

//todo: conditionally render userName field, only if user is not logged in

const CodeInput = ({onCodeSubmit}) => {
   const [joinCode, setJoinCode] = useState('');
   const [error, setError] = useState(false);
   const [submitFlag, setSubmitFlag] = useState(false);
   const [renderErrors, setRenderErrors] =useState(false);

   const config = [
       {field: {
          value: joinCode,
          name: 'Meeting Code',
          minLength: 6,
          }
       }
   ]

   const onFormSubmit = (event) => {
      event.preventDefault();
      setRenderErrors(true);

      if(joinCode.length < 6){
         setError(true);
      }else{
        setError(false);
        onCodeSubmit(joinCode);
      }

      setSubmitFlag(!submitFlag);
   }


   return (
     <Card width="20rem" padding="5rem 0 0 0">
        <div className="content">
          <form className="ui large form"onSubmit={e => onFormSubmit(e)}>
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
                renderErrors
                ? <FormValidation
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
