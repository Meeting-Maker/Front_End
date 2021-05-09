export function storeCurrentGuest (user) {
   localStorage.setItem('guestID', user.id);
   localStorage.setItem('guestName', user.name);
   console.log('STORED GUEST IN LOCALSTORAGE: ', user);
}

export function fetchCurrentGuest () {
   const currentGuest = {
      id: localStorage.getItem('guestID'),
      name: localStorage.getItem('guestName')
   };
   console.log('FETCHED GUEST FROM LOCAL STORAGE: ', currentGuest);
   return currentGuest;
}