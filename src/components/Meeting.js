import React, { useState, useEffect, useRef } from "react";
import CommentList from "./CommentList";
import {
  getComments,
  createComments,
  deleteComment,
} from "../services/Comment";
import {
  addGuest,
  getMeetingDetails,
  meetingExists,
} from "../services/Meeting";
import { getUsers } from "../services/Meeting";
import { getCandidateMeetings } from "../services/CandidateMeeting";
import useWindowDimensions from "../hooks/useWindowDimensions";
import UserList from "./UserList";
import CandidateMeetingList from "./CandidateMeetingList";
import CreateGuest from "./CreateGuest";
import MeetingDetails from "./MeetingDetails";
import { createVote, deleteVote } from "../services/Vote";
import { redirect } from "../services/Redirect";
import CreateComment from "./CreateComment";
import InviteGuests from "./InviteGuests";

import * as socketOperation from "../ultis";

const Meeting = ({
  currentGuest,
  onUpdateGuest,
  onUpdateMeetingID,
  socket,
}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [meetingID, setMeetingID] = useState("");
  const [meetingDetails, setMeetingDetails] = useState();
  const [userList, setUserList] = useState([]);
  const [candidateMeetings, setCandidateMeetings] = useState([]);
  const [comments, setComments] = useState([]);
  const { height } = useWindowDimensions();
  const [connected, setConnected] = useState(false);

  const commentRef = useRef(comments);
  const candidateRef = useRef(candidateMeetings);
  const userRef = useRef(userList);

  useEffect(() => {
    validateMeetingIDParam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!meetingID || meetingID.length !== 6) return;
    refresh();
  }, [meetingID]);

  useEffect(() => {
    if (!connected && meetingID !== "") {
      setConnected(true);
      socket.on("new-remote-operations", ({ socketMeetingID, ops, type }) => {
        if (meetingID === socketMeetingID) checkType(ops, type);
      });
    }
  }, [meetingID, comments, connected]);

  const checkType = (ops, type) => {
    switch (type) {
      case socketOperation.CREATE_COMMENT:
        socketOperation.createComment(ops, setComments, comments, commentRef);
        break;
      case socketOperation.DELETE_COMMENT:
        socketOperation.deleteComment(ops, commentRef, setComments);
        break;
      case socketOperation.CAST_VOTE:
        socketOperation.castVote(ops, candidateRef, setCandidateMeetings);
        break;
      case socketOperation.DELETE_VOTE:
        socketOperation.deleteVote(ops, candidateRef, setCandidateMeetings);
        break;
      case socketOperation.ADD_USER:
        socketOperation.addUser(ops, userRef, setUserList);
        break;
      case socketOperation.ADD_CANDIDATE:
        socketOperation.addCandidate(ops, candidateRef, setCandidateMeetings);
        break;
      case socketOperation.DELETE_CANDIDATE:
        socketOperation.deleteCandidate(
          ops,
          candidateRef,
          setCandidateMeetings
        );
        break;
      default:
        console.log("You passed the wrong type");
        break;
    }
  };

  const refresh = () => {
    updateMeetingDetails();
    getComment();
    updateUserList();
    updateCandidateMeetings();
  };

  //todo: update /join to take value from param
  /**
   * get desired meetingID
   * @returns
   *    meetingID from param                if param is valid
   *    relocates to /join with same param  if param is invalid (null, invalid length, or not in database)
   */
  const validateMeetingIDParam = async () => {
    //todo: increase browser support by changing searchParams function
    const meetingIDFromParam = new URLSearchParams(window.location.search).get(
      "meetingID"
    );

    if (!meetingIDFromParam) {
      redirect("/join");

      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
      return;
    } else if (meetingIDFromParam.length !== 6) {
      redirect("/join", [{ key: "meetingID", value: meetingIDFromParam }]);

      return;
    }

    await meetingExists(meetingIDFromParam).then((response) => {
      if (response.data.meetingExists) {
        onUpdateMeetingID(meetingIDFromParam);
        setMeetingID(meetingIDFromParam);
      } else {
        console.error("meeting does not exist");
      }
    });
  };

  const onCreateGuestUser = async (name) => {
    addGuest({ name: name, meetingID: meetingID }).then((response) => {
      onUpdateGuest({
        id: response.data.userID,
        name: name,
      });
      socketOperation.emitEvent(socket, socketOperation.ADD_USER, meetingID, {
        userID: response.data.userID,
        name: name,
      });
    });
  };

  const createComment = (content) => {
    createComments({
      meetingID: meetingID,
      name: currentGuest.name,
      userID: currentGuest.id,
      content: content,
    }).then((response) => {
      socketOperation.emitEvent(
        socket,
        socketOperation.CREATE_COMMENT,
        meetingID,
        response.data
      );
    });
  };

  function getComment() {
    getComments({
      meetingID: meetingID,
    }).then((response) => {
      const comments = response.data.comments;
      setComments(comments);

      commentRef.current = comments;
    });
  }

  function updateComments(commentID) {
    deleteComment({
      commentID: commentID,
    }).then(() => {
      commentRef.current = comments;
      socketOperation.emitEvent(
        socket,
        socketOperation.DELETE_COMMENT,
        meetingID,
        commentID
      );
    });
  }

  function updateMeetingDetails() {
    getMeetingDetails(meetingID).then((response) => {
      setMeetingDetails(response.data.meetingDetails);
    });
  }

  function updateUserList() {
    getUsers({
      meetingID: meetingID,
    }).then((response) => {
      setUserList(response.data.users);
      userRef.current = response.data.users;
    });
  }

  const onCandidateMeetingClick = async (candidateMeeting) => {
    candidateRef.current = candidateMeetings;
    if (
      candidateMeeting.voters.filter(
        (voter) => voter.userID === currentGuest.id
      ).length > 0
    ) {
      await deleteVote({
        userID: currentGuest.id,
        candidateID: candidateMeeting.candidateID,
      }).then(() => {
        socketOperation.emitEvent(
          socket,
          socketOperation.DELETE_VOTE,
          meetingID,
          {
            userID: currentGuest.id,
            candidateID: candidateMeeting.candidateID,
          }
        );
      });
    } else {
      await createVote({
        userID: currentGuest.id,
        candidateID: candidateMeeting.candidateID,
      }).then(() => {
        socketOperation.emitEvent(
          socket,
          socketOperation.CAST_VOTE,
          meetingID,
          { userID: currentGuest.id, candidateMeeting: candidateMeeting }
        );
      });
    }
  };

  function updateCandidateMeetings() {
    getCandidateMeetings(meetingID).then((response) => {
      setCandidateMeetings(response.data.candidateMeetings);
      candidateRef.current = response.data.candidateMeetings;
    });
  }

  const onGuestJoin = (guest) => {
    onUpdateGuest(guest);
  };

  const onHighlightCandidateMeeting = (candidateMeeting) => {
    if (!selectedCandidate) {
      setSelectedCandidate(candidateMeeting);
      setSelectedUser(null);
    } else {
      setSelectedCandidate(null);
    }
  };

  const onHighlightUser = (user) => {
    if (!selectedUser) {
      setSelectedUser(user.id);
      setSelectedCandidate(null);
    } else {
      setSelectedUser(null);
    }
  };

  //if user does not have a guestID or name, todo: or if their guest id is not in the current meeting's userList
  if (!currentGuest.id || !currentGuest.name || currentGuest.role === null) {
    return (
      <div>
        <UserList
          userList={userList}
          selectedCandidate={selectedCandidate}
          selectedUser={selectedUser}
          onSelectUser={onGuestJoin}
        />
        <CreateGuest onCreateGuestUser={onCreateGuestUser} />
      </div>
    );
  }

  if (
    !meetingDetails ||
    !meetingDetails.title ||
    !meetingDetails.dueDate ||
    !meetingDetails.meetingID ||
    !userList ||
    !userList.length > 0 ||
    !candidateMeetings ||
    !candidateMeetings.length >= 2
  ) {
    return (
      <div className="ui segment">
        <div className="ui active dimmer">
          <div className="ui text loader">Loading</div>
        </div>
        <p />
      </div>
    );
  }

  return (
    <div className="center aligned ui three column very relaxed stackable grid">
      <div className="column" style={{ height: `${height - 125}px` }}>
        <MeetingDetails meetingDetails={meetingDetails} />
        <UserList
          userList={userList}
          selectedUser={selectedUser}
          onSelectUser={onHighlightUser}
          selectedCandidate={selectedCandidate}
          votingPage={true}
        />
        <InviteGuests />
      </div>

      <div className="column" style={{ height: `${height - 125}px` }}>
        <CandidateMeetingList
          currentGuest={currentGuest}
          selectedUser={selectedUser}
          title="Vote"
          candidateMeetings={candidateMeetings}
          selectedCandidate={selectedCandidate}
          onSelectCandidate={onHighlightCandidateMeeting}
          onCandidateMeetingClick={onCandidateMeetingClick}
          updateCandidateMeetings={updateCandidateMeetings}
          votingPage={true}
          meetingID={meetingDetails.meetingID}
          setComments={setComments}
          socket={socket}
        />
      </div>

      <div className="column">
        <div
          className={"card"}
          style={{ overflow: "hidden", height: `${height - 125}px` }}
        >
          <div
            className={"ui  header"}
            style={{ marginBottom: "0", marginTop: "1em" }}
          >
            Comments
          </div>
          <CommentList
            useref={"comment"}
            updateComments={updateComments}
            comments={comments}
            currentGuest={currentGuest}
            height={height}
          />
          <CreateComment createComment={createComment} />
        </div>
      </div>
    </div>
  );
};

export default Meeting;
