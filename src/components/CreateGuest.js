import React, {useState} from "react";
import Button from './Button';
import Card from './Card';

const CreateGuest = ({onCreateGuestUser}) => {
   const [userName, setUserName] = useState('');
   const [addGuest, setAddGuest] = useState(false);

   const onFormSubmit = (event) => {
      event.preventDefault();

      onCreateGuestUser(userName);
   }

   return (
      <Card padding="1rem 0 0 0" width="25rem">
         <div className="content">
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
         </div>
      </Card>
   );
}

export default CreateGuest;
