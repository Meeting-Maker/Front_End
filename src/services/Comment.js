import api from './api';

export function formatDate(date) {
    return `${date.substring(11, 16)} - ${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(2, 4)}`;
}

export async function getComments(meetingID) {
    return await api.get('/getComments', {
        params: meetingID
    });
}

// information needs to contain both meetingID, commentID and contents
export async function createComments(information) {
    return await api.post('/createComment', information);
}

export async function deleteComment(commentID) {
    await api.delete('/deleteComment', {
        params: commentID
    })
}