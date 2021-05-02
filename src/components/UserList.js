import React from "react";
import {Button, Card} from 'react-bootstrap';

const CandidateMeetingList = ({users}) => {
   const onUserClick = (userID) => {
      //do something
      console.log('userID: ' + userID);
   };

   if(users.length === 0){
      return (
         <div>
            <Card>
               <Card.Body>
                  There are no users
               </Card.Body>
            </Card>
         </div>
      );
   }

   const renderedList = users.map((user) => {
      return (
         <div key={user.userID} onClick={() => onUserClick(user.userID)}>
            <Card>
               <Card.Body>
                  {user.name}
               </Card.Body>
            </Card>
         </div>
      );
   });

   return (
      <div>
         <h3>
            Logged-in Users
         </h3>
         {renderedList}
         <h3>
            Guest Users
         </h3>
         {renderedList}
      </div>

   );
};

export default CandidateMeetingList;