import React from "react";
import {Button, Card} from 'react-bootstrap';

const CandidateMeetingList = ({userList}) => {
   const onUserClick = (userID) => {
      //do something
      console.log('userID: ' + userID);
   };

   if(userList.length === 0){
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

   const renderedList = userList.map((user) => {
      return (
         <div key={user.id} onClick={() => onUserClick(user.id)}>
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
         Users
      </h2>
      {renderedList}
   </div>;
};

export default CandidateMeetingList;