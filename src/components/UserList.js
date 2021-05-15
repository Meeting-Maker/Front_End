import React, {useEffect, useState} from "react";
import '../css/UserList.css'
import Card from './Card';
import CreateGuest from "./CreateGuest";


const UserList = ({userList, selectedUser, selectedCandidate, onSelectUser}) => {

   const [active, setActive] = useState(false);

   useEffect(
      () => {

      }, [userList, selectedUser]
   );

   if (userList.length === 0) {
      return (
         <div className="ui container">
            There are no users
         </div>
      );
   }
   const renderedList = userList.map((user) => {
      let selectedStyle;
      if(selectedCandidate){
         selectedStyle = (selectedUser === user.id) || (selectedCandidate.voters.filter(voter => voter.userID === user.id).length > 0) ? "teal" : "";
      }else{
         selectedStyle = (selectedUser === user.id) ? "teal" : "";
      }
      return (
         <div className="user-card"
              key={user.id}
              onClick={() => onSelectUser({id: user.id, name: user.name})}
              style={{padding: "0.5rem 0 0.5rem 0"}}>
            <div
               className="ui container"
               style={{width: "25rem"}}
            >
               <div
                  className={`ui ${selectedStyle} fluid card`}
               >
                  <div className="content">
                     <div className={"ui header floated left"}>
                        {user.name}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   });

   return (
      <div>
         <div
            className={"ui card centered grey"}
            style={{overflow: "hidden", width: "30rem", paddingBottom: "0.5rem", marginTop: "1rem"}}
         >
            <div className={"ui medium header"} style={{margin: "0.5em 0 0 0", textAlign: "center"}}>
               Users
            </div>
            {renderedList}
         </div>
         {/*<CreateGuest/>*/}
      </div>
   );
};

export default UserList;
