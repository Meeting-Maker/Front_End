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
      <Card width="20rem">
        <div className="content">
           <form className="ui large form"onSubmit={(e) => onFormSubmit(e)}>
              <div>
                 <Button className="custom-button dark thin" onClick={() => setAddGuest(!addGuest)}>
                    Add Yourself as a Guest
                 </Button>
                 {
                    addGuest ?
                       <input
                          type="text"
                          placeholder="Your Name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          style={{marginTop: "0.5rem"}}
                       />
                    :
                       null
                 }
              </div>
           </form>
         </div>
      </Card>
   );
}

export default CreateGuest;
