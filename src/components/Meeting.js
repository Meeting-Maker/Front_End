import React, {useState, useEffect, useRef} from "react";
import CandidateMeetingList from "./CandidateMeetingList";
import MeetingDetails from "./MeetingDetails";
import UserList from "./UserList";
import api from '../services/api';
import CommentList from "./CommentList";
import {getComments, createComments} from "../services/Comment"
import useWindowDimensions from "../hooks/useWindowDimensions";
import Button from "./Button"
//todo: conditional rendering for types of meeting (poll/common availability)
const Meeting = ({currentUser, currentMeeting}) => {
    // const [userList, setUserList] = useState([]);
    // const [candidateMeetings, setCandidateMeetings] = useState([]);
    const [comments, setComment] = useState([]); // state to keep track of comments
    const commentForm = useRef(); // references to the comment form
    const {height} = useWindowDimensions();

    // useEffect(
    //    () => {
    //       const getCandidates = async () => {
    //          const response = await api.get('/getCandidateMeetings',
    //             {
    //                params: {
    //                   meetingID: currentMeeting
    //                }
    //             }
    //          );
    //       };
    //    }, [candidateMeetings]
    // );

    // useEffect(
    //    () => {
    //       const getUsers = async () => {
    //          const response = await api.get('/getUsers',
    //             {
    //                params: {
    //                   meetingID: currentMeeting
    //                }
    //             }
    //          )
    //          setUserList(response.data.users);
    //       };
    //       getUsers();
    //
    //       const getCandidateMeetings = async () => {
    //          const response = await api.get('/getCandidateMeetings',
    //             {
    //                params: {
    //                   meetingID: currentMeeting
    //                }
    //             }
    //          )
    //          //todo: assign meetinglist
    //          console.log(response.data);
    //          //setCandidateMeetings(response.data);
    //       };
    //       getCandidateMeetings();
    //    }, []
    // );

    /* TODO: @Brandon I don't know how you are storing the meetingID
       so i just hard coded the meetingID i have in my my database, changing it
       to each instance of the meeting
    */
    useEffect(() => {
        setComment([]);
        getComments({
            meetingID: 'ZQTNN1'
        }).then(response => {
            const comments = response.data.comments;
            comments.forEach((comment) => setComment(old => [...old, comment]));
        });
    }, []);

    /* TODO: Same with this, meetingID, name and userID is currently hard coded, you will need to replace it with
       however you are storing the meetingID and name
     */
    function submitComment(event) {
        event.preventDefault();
        createComments({
            meetingID: "ZQTNN1",
            name: "fgfdgfdgfdfg",
            userID: "18",
            content: event.target[0].value
        }).then(response => {
            setComment(old => [...old, response.data]);
            commentForm.current.reset();
        });
    }

    return (
        <div>
            <div className="center aligned ui three column very relaxed grid">

                <div className="column">
                    <h3>Users</h3>
                    {/*<UserList userList={userList}></UserList>*/}
                </div>

                <div className="column">
                    <h3>Candidate Meetings</h3>
                    {/*<CandidateMeetingList candidateMeetings={candidateMeetings}/>*/}
                </div>

                <div className="column">
                    <h3 className="centered">Comments</h3>
                    <div className={"card"} style={{overflow: "hidden", height: `${height - 155}px`}}>
                        <CommentList comments={comments} height={height}/>
                        {/* comment input */}
                        <form ref={commentForm}
                              className="ui centered reply form" onSubmit={e => submitComment(e)}>
                            <div className="centered field">
                            <textarea name="content"
                                      placeholder="What are your thoughts?"
                                      style={{width: "90%", height:"50px"}}/>
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Button type="submit"
                                        className="custom-button dark thick span"
                                        style={{width: "90%"}}>
                                    Comment
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Meeting;