export function storeCurrentGuest (user) {
   localStorage.setItem('guestID', user.id);
   localStorage.setItem('guestName', user.name);
}

export function fetchCurrentGuest () {
   return {
      id: localStorage.getItem('guestID'),
      name: localStorage.getItem('guestName')
   };
}

export function storeCurrentMeeting (meetingID) {
   localStorage.setItem('meetingID', meetingID);
}

export function fetchCurrentMeeting () {
   return localStorage.getItem('meetingID');
}