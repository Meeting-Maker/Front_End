import api from './api';

export async function register(meetingDetails) {
    await api.post('/register', meetingDetails);
}

export async function login(meetingDetails) {
    await api.post('/login', meetingDetails);
}