import api from './api';

export async function getMeeting(meetingID) {
    return await api.get('/getMeeting', {
        params: meetingID
    });
}

export async function getUsers(meetingDetails) {
    return await api.get('/getUsers', {
        params: meetingDetails
    });
}

export async function createGuestMeeting(meetingDetails) {
    await api.post('/createGuestMeeting', meetingDetails);
}

export async function addGuest(guestDetails) {
    await api.post('/addGuestUser', guestDetails);
}

export async function editMeetingType(meetingType) {
    await api.post('/editMeetingType', meetingType);
}

export async function editMeetingDetails(meetingDetails) {
    await api.post('/editMeetingDetails', meetingDetails);
}

export async function deleteMeeting(meetingID) {
    await api.delete('/deleteMeeting', {
        params: meetingID
    })
}