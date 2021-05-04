import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

const CreateGuest = ({onCreateGuestUser}) => {
   const [userName, setUserName] = useState('');
   const [addGuest, setAddGuest] = useState(false);

   const onFormSubmit = (event) => {
      event.preventDefault();

      onCreateGuestUser(userName);
   }

   return (
      <div>
         <Form onSubmit={(e) => onFormSubmit(e)}>
            <Form.Group>
               <Button onClick={() => setAddGuest(!addGuest)}>
                  Add Yourself as a Guest
               </Button>
               {
                  addGuest ?
                     <Form.Control
                        type="text"
                        placeholder="Your Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                     />
                  :
                     null
               }
            </Form.Group>
         </Form>
      </div>
   );
}

export default CreateGuest;
