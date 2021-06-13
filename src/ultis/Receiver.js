export const createComment = (ops, setComments, comments, ref) => {
  const temp = [...ref.current, ops];
  setComments(temp);
  ref.current = temp;
};

export const deleteComment = (ops, ref, setComments) => {
  const updateComment = ref.current.filter(
    (comment) => comment.commentID !== ops
  );
  setComments(updateComment);
  ref.current = updateComment;
};

export const castVote = (ops, ref, setCandidateMeetings) => {
  ref.current.map((candidateMeeting) => {
    if (candidateMeeting.candidateID === ops.candidateMeeting.candidateID)
      candidateMeeting.voters.push({ userID: ops.userID });
    return candidateMeeting;
  });
  setCandidateMeetings([]);
  setCandidateMeetings(ref.current);
};

export const deleteVote = (ops, ref, setCandidateMeetings) => {
  ref.current.map((candidateMeeting) => {
    if (candidateMeeting.candidateID === ops.candidateID) {
      candidateMeeting.voters = candidateMeeting.voters.filter((vote) => {
        return vote.userID !== ops.userID;
      });
    }
    return candidateMeeting;
  });
  setCandidateMeetings([]);
  setCandidateMeetings(ref.current);
};

export const addUser = (ops, ref, setUser) => {
  const temp = [...ref.current, { name: ops.name, id: ops.userID, role: 0 }];
  setUser(temp);
  ref.current = temp;
};
