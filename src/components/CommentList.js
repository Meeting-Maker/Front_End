import Comment from './Comment';
import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
const CommentList = ({comments, updateComments, currentGuest}) => {
    const renderList = comments.map((comment) => {
        return (
            <div key={comment.commentID} className={"item"} style={{padding: "0.5em 0"}}>
                <div className={"content"}>
                        <Comment
                           comment={comment}
                           updateComments={updateComments}
                           currentGuest={currentGuest}
                        />
                </div>
            </div>
        )
    });

    return (
        <div className={"ui list"} style={{ overflowY: "auto", marginBottom: "0"}}>
            {renderList}
        </div>
    );
}

export default CommentList;