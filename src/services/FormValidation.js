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

   return new Date(dateTtime) >= now;
}

export const isValidSize = ({value, minSize}) => {
   return value >= minSize;
}