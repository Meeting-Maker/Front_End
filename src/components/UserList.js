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

   return <div>
      <h2>
         Logged-in Users
      </h2>
      {renderedList}
      <h2>
         Guest Users
      </h2>
      {renderedList}
   </div>;
};

export default CandidateMeetingList;