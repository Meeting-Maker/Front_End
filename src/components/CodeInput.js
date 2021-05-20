import React, {useState, useEffect} from 'react';
import Button from './Button';
import Card from './Card';
import ErrorList from "./ErrorList";


//todo: conditionally render userName field, only if user is not logged in

const CodeInput = ({onCodeSubmit, meetingIDFromParam}) => {
   const [joinCode, setJoinCode] = useState('');
   const [submitFlag, setSubmitFlag] = useState(false);
   const [formErrors, setFormErrors] = useState([]);

   useEffect(
      () => {

      }, [joinCode]
   );

   useEffect(
      () => {
         if (meetingIDFromParam) {
            setJoinCode(meetingIDFromParam);
            setSubmitFlag(!submitFlag);
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [meetingIDFromParam]
   );

   const validateCode = () => {
      let tempErrors = [];

      if(joinCode.length !== 6){
         tempErrors.push('Invalid Code');
      }

      return tempErrors;
   }

   const onFormSubmit = async (event) => {
      event.preventDefault();
      setSubmitFlag(!submitFlag);

      const tempErrors = validateCode();

      if (tempErrors.length === 0) {
         onCodeSubmit(joinCode);
      } else {
         setFormErrors(tempErrors)
      }
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
            <ErrorList
               errors={formErrors}/>
         </div>
      </Card>
   );
};

export default CodeInput;
