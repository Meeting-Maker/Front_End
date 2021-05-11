import Comment from './Comment';
import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default ( { comments, updateComments}) => {

    const renderList = comments.map((comment) => {
        return (
            <div key={comment.commentID} className={"item"} style={{paddingTop: "0.5em"}}>
                <div className={"content"}>
                        <Comment updateComments={updateComments}
                                 commentUserID={comment.userID}
                                 commentID={comment.commentID}
                                 name={comment.name}
                                 date={comment.createdAt}
                                 content={comment.content}/>
                </div>
            </div>
        )
    });

    return (
        <div className={"ui list"} style={{ overflow: "auto", marginBottom: '0'}}>
            {renderList}
        </div>
    );
}
