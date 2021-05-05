import React, {useState} from 'react';
import Button from './Button';
import Link from '../router/Link';
import Card from './Card';

//todo: conditionally render userName field, only if user is not logged in

const CodeInput = ({onCodeSubmit}) => {
   const [joinCode, setJoinCode] = useState('');

   const onFormSubmit = (event) => {
      event.preventDefault();
      console.log('joinCode: ', joinCode);
      onCodeSubmit(joinCode);
   }

   return (
     <Card width="20rem">
        <div className="content">

         <form className="ui large form"onSubmit={e => onFormSubmit(e)}>
            <div className="field" style={{marginBottom: "0.5rem"}}>

               <input
                  style={{fontSize: "2em", padding: "0", textAlign: "center"}}
                  maxLength="6"
                  type="text"
                  placeholder="Code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
               />
            </div>
              <Button
                 className="custom-button dark span"
                 type="submit"
              >
              Join
              </Button>
            </form>
          </div>
          </Card>

   );

};

export default CodeInput;
