import React, {useState} from 'react';
import Button from './Button';
import Link from '../router/Link';

//todo: conditionally render userName field, only if user is not logged in

const CodeInput = ({onCodeSubmit}) => {
   const [joinCode, setJoinCode] = useState('');

   const onFormSubmit = (event) => {
      event.preventDefault();
      onCodeSubmit(joinCode);
   }

   return (
     <div className="ui centered grid" style={{paddingTop: "15rem"}}>
      <div className="ui container" style={{width: "25%"}}>
        <div className="ui fluid card">

        <div className="content">
          <div className="header">
            Join A Meeting
          </div>
        </div>

        <div className="content">
         <form className="ui large form"onSubmit={e => onFormSubmit(e)}>
            <div className="field">
               <input
                  maxLength="6"
                  type="text"
                  placeholder="Enter Code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
               />
            </div>

              <Link href="">
                 <Button
                    className="custom-button dark span"
                    type="submit"
                 >
                 Join
                 </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>

   );

};

export default CodeInput;
