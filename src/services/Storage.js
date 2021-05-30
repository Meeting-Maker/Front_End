export function storeCurrentGuestLocal (user) {
   localStorage.setItem('guestID', user.id);
   localStorage.setItem('guestName', user.name);
}

export function fetchCurrentGuestLocal () {
   return {
      id: parseInt(localStorage.getItem('guestID')),
      name: localStorage.getItem('guestName')
   };
}

export function storeCurrentGuestSession (user) {
   sessionStorage.setItem('guestID', user.id);
   sessionStorage.setItem('guestName', user.name);
   sessionStorage.setItem('guestRole', user.role);
}

export function fetchCurrentGuestSession () {
   return {
      id: parseInt(sessionStorage.getItem('guestID')),
      name: sessionStorage.getItem('guestName'),
      role: sessionStorage.getItem('guestRole')
   };
}

export function storeCurrentMeeting (meetingID) {
   localStorage.setItem('meetingID', meetingID);
}

export function fetchCurrentMeeting () {
   return localStorage.getItem('meetingID');
}