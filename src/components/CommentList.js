import Comment from './Comment';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({comments, height}) => {

    const renderList = comments.map((comment) => {
        return (
            <div key={comment.commentID} className={"item"} style={{paddingTop: "0.5em"}}>
                <div className={"content"}>
                    <div>
                        <Comment name={comment.name} date={comment.createdAt} content={comment.content}/>
                    </div>
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
