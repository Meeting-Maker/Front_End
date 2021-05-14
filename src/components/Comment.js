import Icon from '@mdi/react';
import {mdiAccount, mdiDelete} from '@mdi/js';
import React from "react";
import {formatDate} from "../services/Comment";
import {deleteComment} from "../services/Comment";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({comment, updateComments, currentGuest}) => {

   const onDeleteComment = () => {
      try {
         deleteComment({
            commentID: comment.commentID
         }).then(() => {
            updateComments();
         });
      } catch (error) {
      }
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
                        {comment.name}
                        <div className={"metadata"}>
                           <span className={"date"}> {formatDate(comment.createdAt)} </span>
                        </div>
                     </a>
                     <br/>
                     <div className={"text"} style={{float: "left"}}>
                        {comment.content}
                     </div>
                  </div>
               </div>
               {
                  currentGuest.id === comment.userID ?
                     <Icon onClick={onDeleteComment} className={"right floated"} path={mdiDelete} size={1}/>
                     : null
               }
            </div>
         </div>
      </div>
   )
}