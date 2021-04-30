import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import Button from './Button';

//todo: conditionally render userName field, only if user is not logged in

const CodeInput = ({onCodeSubmit}) => {
   const [joinCode, setJoinCode] = useState('');

   const onFormSubmit = (event) => {
      event.preventDefault();
      onCodeSubmit(joinCode);
   }

   return (
      <div>
         <Form onSubmit={e => onFormSubmit(e)}>
            <Form.Group>
               <Form.Control
                  maxLength="6"
                  type="text"
                  placeholder="Code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
               />
               <Button
                  className="custom-button dark span"
                  type="submit"
               >Join</Button>
            </Form.Group>
         </Form>
      </div>

   );

};

export default CodeInput;
