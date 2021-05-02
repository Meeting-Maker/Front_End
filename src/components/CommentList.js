import Comment from './Comment';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
        const renderList = props.comments.map((comment) => {
            return (
                <div key={comment.id} className={"item"}>
                    <div className={"right floated content"} >
                        <div>
                            <Comment name={comment.name} date={comment.date} content={comment.content}/>
                        </div>
                    </div>
                </div>
            )
        });

    return (
        <div className={"ui list"} >
            {renderList}
        </div>
    );
}
