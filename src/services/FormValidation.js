//todo: censor curse words
export const isValidLength = ({value, minLength}) => {
   let valid = true;
   if(value.length < minLength){
      return false;
   }
   return valid;
}

export const isFutureDate = ({dateTtime}) => {
   let now = new Date();
   now.setHours(now.getHours(), now.getMinutes(), 0, 0);

   const [date, time] = dateTtime.split('T');
   const [year, month, day] = date.split('-');
   const [hour, minute] = time.split(':');

   let selectedDate = new Date(parseInt(year), month - 1, parseInt(day), parseInt(hour),
      parseInt(minute), 0, 0);

   return selectedDate >= now;
}