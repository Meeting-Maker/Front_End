import React, { useState } from "react";
import "../css/UserList.css";

const UserList = ({
  userList,
  selectedUser,
  selectedCandidate,
  onSelectUser,
  votingPage,
}) => {
  const [delayedUserList, setDelayedUserList] = useState([]);
  const [delayedAdminList, setDelayedAdminList] = useState([]);
  const [delayedGuestList, setDelayedGuestList] = useState([]);

  if (userList.length === 0) {
    return <div className="ui container">There are no users</div>;
  }

  if (delayedUserList !== userList) {
    updateDelayedLists();
  }

  function updateDelayedLists() {
    let adminList = [];
    let guestList = [];

    //sorts users into admin and guestList
    for (const i in userList) {
      if (userList[i].role === 0) guestList.push(userList[i]);
      else if (userList[i].role === 1) adminList.push(userList[i]);
    }

    setDelayedAdminList(adminList);
    setDelayedGuestList(guestList);
    setDelayedUserList(userList);
  }

   if(delayedUserList !== userList){
      updateDelayedLists();
   }

   function updateDelayedLists(){
      let adminList = [];
      let guestList = [];

      //sorts users into admin and guestList
      for(const i in userList){
         if(userList[i].role === 0) guestList.push(userList[i]);
         else if(userList[i].role === 1) adminList.push(userList[i]);
      }

      setDelayedAdminList(adminList);
      setDelayedGuestList(guestList);
      setDelayedUserList(userList);
   }

   function UserCard(user){
      let selectedStyle;
      if(selectedCandidate){
         selectedStyle = (selectedUser === user.id) || (selectedCandidate.voters.filter(voter => voter.userID === user.id).length > 0) ? "#45A29E" : "#d4d4d5";
      }else{
         selectedStyle = (selectedUser === user.id) ? "#45A29E" : "#d4d4d5";
      }
      return (
         <div
            key={user.id}
            onClick={() => onSelectUser({id: user.id, name: user.name, role: user.role})}
            style={{padding: "0.5rem 0 0.5rem 0"}}>
            <div
               className="ui container"
               style={{width: "32rem"}}
            >
               <div
                  className={`ui link ${selectedStyle} fluid card user-card`}
                  style={{boxShadow: `0 0 0 1px ${selectedStyle}`}}
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
  }

  const renderedAdminList = delayedAdminList.map((user) => UserCard(user));
  const renderedGuestList = delayedGuestList.map((user) => UserCard(user));

   return (
      <div>
         <div
            className={"ui card centered grey"}
            style={{overflow: "hidden", width: "33rem", paddingBottom: "1rem", marginTop: "1rem", maxHeight: votingPage ? "60%" : "80%"}}
         >
            <div className={"ui medium header"} style={{margin: "0.5em 0 0 0", textAlign: "center"}}>
               Owners
            </div>
            {renderedAdminList}
            <div className={"ui medium header"} style={{margin: "0.5em 0 0 0", textAlign: "center"}}>
               Guests
            </div>
            {renderedGuestList}
         </div>
      </div>
  );
};

export default UserList;
