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
         // display the error to user
      }
   }

   function renderComment() {
      if (comment.userID !== 1)
         return (
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
                     <div className={"text"}
                          style={{float: "left"}}>
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
         )
      else
         return (
            <div className={"content"} style={{padding: '0.5em'}}>
               <div className={"content"}>
                  <div className={"text"}
                       style={{float: "center"}}>
                     {comment.content}
                  </div>
               </div>
            </div>
         )
   }

   return (
      <div className={"ui container comments"} style={{padding: "0"}}>
         <div className={"ui card centered"} style={{width: "90%"}}>
            {renderComment()}
         </div>
      </div>
   )
}