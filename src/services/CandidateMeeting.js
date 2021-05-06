import api from './api';

export async function getCandidateMeeting(meetingID) {
    return await api.get('/getCandidateMeetings', {
        params: meetingID
    });
}

export async function createCandidateMeeting(candidateMeetingDetails) {
    await api.post('/createCandidateMeeting', candidateMeetingDetails);
}

export async function editCandidateMeeting(candidateMeetingDetails) {
    await api.post('/editCandidateMeeting', candidateMeetingDetails);
}

export async function deleteCandidateMeeting(candidateID) {
    await api.delete('/deleteCandidateMeeting', {
        params: candidateID
    })
}