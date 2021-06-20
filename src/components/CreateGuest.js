import React, {useState} from "react";
import Button from './Button';
import {isValidLength} from "../services/FormValidation";
import ErrorList from "./ErrorList";

const CreateGuest = ({onCreateGuestUser}) => {
   const [userName, setUserName] = useState('');
   const [addGuest, setAddGuest] = useState(false);
   const [formErrors, setFormErrors] = useState([]);

   const onFormSubmit = (event) => {
      event.preventDefault();
      const tempErrors = validateGuestUser();

      if(tempErrors.length === 0){
         onCreateGuestUser(userName);
      }

      setFormErrors(tempErrors);
   }

   const validateGuestUser = () => {
      let tempErrors = [];

      if(!isValidLength({
         value: userName,
         minLength: 2
      })) tempErrors.push('Your Name must be at least 2 characters long.');
      return tempErrors;
   }

   return (

      <div className={"ui grid"} style={{padding: "1rem 0 0 0"}}>
         <div className="ui container" style={{width: "25rem", paddingBottom: "1em"}}>
            <div className="ui grey fluid card" style={{marginTop: "1rem"}}>
               <div className="content" >
                  <form className="ui large form" onSubmit={(e) => onFormSubmit(e)}>
                     <div>
                        {
                           addGuest ?
                              <div>
                                 <div className="field">
                                    <input
                                       type="text"
                                       placeholder="Your Name"
                                       name="guestName"
                                       value={userName}
                                       onChange={e => setUserName(e.target.value)}
                                    />
                                 </div>
                                 <div style={{textAlign: "center"}}>
                                    <Button
                                       type="submit"
                                       className="custom-button dark thin span">
                                       Submit
                                    </Button>
                                    {' '}
                                 </div>
                              </div>
                              :
                              <Button type="button" className="custom-button dark thin span"
                                      onClick={() => setAddGuest(true)}>
                                 Add Yourself as a Guest
                              </Button>
                        }
                     </div>
                  </form>
                  <ErrorList errors={formErrors}/>
               </div>
            </div>
         </div>
      </div>
   );
}

export default CreateGuest;
