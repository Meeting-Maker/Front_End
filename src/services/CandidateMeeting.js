import api from './api';

export async function getCandidateMeetings(meetingID) {
    console.log('getting candidates: ' + meetingID);
    return await api.get('/getCandidateMeetings', {
        params: {
            meetingID: meetingID
        }
    });
}

export async function createCandidateMeeting(candidateMeetingDetails) {
    console.log('posting candidate: ', candidateMeetingDetails);
    await api.post('/createCandidateMeeting', candidateMeetingDetails);
}

export async function createCandidateMeetings(candidateMeetingList) {
    for(let i = 0; i < candidateMeetingList.length; i++){
        await createCandidateMeeting(candidateMeetingList[i]);
    }
}

export async function editCandidateMeeting(candidateMeetingDetails) {
    await api.post('/editCandidateMeeting', candidateMeetingDetails);
}

export async function deleteCandidateMeeting(candidateID) {
    await api.delete('/deleteCandidateMeeting', {
        params: {
            candidateID: candidateID
        }
    })
}