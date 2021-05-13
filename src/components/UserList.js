import React, {useEffect} from "react";
import '../css/UserList.css'
import Card from './Card';

const UserList = ({userList, onSelectUser}) => {

   console.log('USERLIST: ', userList);

   useEffect(
      () => {

      }, [userList]
   );

   if (userList.length === 0) {
      return (
         <div className="ui container">
            There are no users
         </div>
      );
   }

   const renderedList = userList.map((user) => {
      return (
         <div className="user-card"
              key={user.id}
              onClick={() => onSelectUser({id: user.id, name: user.name})}
               style={{padding: "0.25rem 0 0.25rem 0"}}>
            <div className="ui container" style={{width: "25rem"}}>
               <a className="ui grey fluid card">
                  <div className="content">
                     <div className={"ui header floated left"}>
                        {user.name}
                     </div>
                  </div>
               </a>
            </div>
         </div>
      );
   });

   return (
      <div style={{paddingTop: "5rem"}}>
         <Card width={"27rem"} padding={"1rem"}>
            {renderedList}
         </Card>
      </div>

   );
};

export default UserList;
