export const emitEvent = (socket, type, meetingID, data) => {
    socket.emit("new-operations", {
        type: type,
        socketMeetingID: meetingID,
        ops: data
     });
}