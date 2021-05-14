import api from "./api";

export async function getVotes(candidateID) {
    return await api.get('/getVotes', {
        params: {
            candidateID: candidateID
        }
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