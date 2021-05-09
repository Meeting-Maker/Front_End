import api from "./api";

export async function getVote(candidateID) {
    return await api.get('/getVote', {
        params: candidateID
    });
}

export async function createVote(voteDetails) {
    await api.post('/createVote', voteDetails);
}

export async function deleteVote(voteID) {
    await api.delete('/deleteVote', {
        params: voteID
    })
}