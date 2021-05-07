import React, {useState, useEffect} from 'react';
import Button from './Button';
import Link from '../router/Link';
import Card from './Card';

//todo: conditionally render userName field, only if user is not logged in

const CodeInput = ({onCodeSubmit}) => {
   const [joinCode, setJoinCode] = useState('');

   const [error, setError] = useState(false);

   const onFormSubmit = (event) => {
      event.preventDefault();
      console.log('joinCode: ', joinCode);

      if(joinCode.length < 6){
         setError(true)
      }else{
        setError(false)
        onCodeSubmit(joinCode);
      }

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
            {error
              ?
              <div
                className="ui error message"
                style={{textAlign: "center", padding: "0.25rem 0.25rem", marginTop: "0.5rem"}}
              >
                Invalid Meeting Code
              </div>
             :
             ' '
           }
        </div>
      </Card>
   );

};

export default CodeInput;
