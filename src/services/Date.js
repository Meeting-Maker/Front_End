const months = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function storeCurrentGuest (user) {
   localStorage.setItem('guestID', user.id);
   localStorage.setItem('guestName', user.name);
}

export function getStandardSuffix(hour){
   return hour < 12 ? 'AM' : 'PM';
}

export function getDayString(date){
   return days[date.getDay()];
}

export function getMonthString(date){
   return months[date.getMonth()];
}

export function breakStandardDate(standardDate){
   const [date, time] = standardDate.split('T');
   return date.split('-').concat(time.split(':'));
}