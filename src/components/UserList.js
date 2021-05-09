import React from "react";
import Card from './Card';

const UserList = ({userList}) => {

   console.log('USERLIST: ', userList);

   const onUserClick = (userID) => {
      //do something
      console.log('userID: ' + userID);
   };

   if(userList.length === 0){
      return (
         <Card>
            There are no users
         </Card>
      );
   }

   const renderedList = userList.map((user) => {
      return (
         <div key={user.id} onClick={() => onUserClick(user.id)}>
            <Card>
                  {user.name}
            </Card>
         </div>
      );
   });

   return (
     <div>
      <h2>
        Users
      </h2>
      {renderedList}
     </div>
 );
};

export default UserList;
