import Comment from './Comment';
import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
const CommentList = ({comments, updateComments, currentGuest}) => {
    const renderList = comments.map((comment) => {
        return (
            <div key={comment.commentID} className={"item"} style={{paddingTop: "0.5em"}}>
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
        <div className={"ui list"} style={{ overflow: "auto", marginBottom: '0'}}>
            {renderList}
        </div>
    );
}

export default CommentList;