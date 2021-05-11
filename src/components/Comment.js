import Icon from '@mdi/react';
import {mdiAccount, mdiDelete} from '@mdi/js';
import React, {useState} from "react";
import {formatDate} from "../services/Comment";
import {deleteComment} from "../services/Comment";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({commentUserID, updateComments, commentID, name, content, date}) => {

   const [id] = useState(commentID);

   function deletecomment() {
      try {
         deleteComment({
            commentID: id
         }).then(() => {
            updateComments();
         });
      } catch (error) {
         console.log(error);
      }
   }

   // TODO: update the hardcoded value
   function showDelete() {
      if (commentUserID === 18)
         return <Icon onClick={deletecomment} className={"right floated"} path={mdiDelete} size={1}/>
   }

   return (
      <div className={"ui container comments"}>
         <div className={"ui card centered"} style={{width: "90%"}}>
            <div className={"content"}>
               <div className={"comment"}>
                  <div className={"avatar"}>
                     <Icon path={mdiAccount}
                           size={2}
                           color={"black"}/>
                  </div>
                  <div className={"content"}>
                     <a href={"/"} className={"author"} style={{float: "left"}}>
                        {name}
                        <div className={"metadata"}>
                           <span className={"date"}> {formatDate(date)} </span>
                        </div>
                     </a>
                     <br/>
                     <div className={"text"} style={{float: "left"}}>
                        {content}
                     </div>
                  </div>
               </div>
               {showDelete()}
            </div>
         </div>
      </div>
   )
}