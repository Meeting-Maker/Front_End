import React, {useEffect, useState} from 'react';

const ErrorList = ({errors}) => {
   const [renderedErrors, setRenderedErrors] = useState('');

   useEffect(
      () => {
         if(errors.length > 0) setRenderedErrors(errors.map(error => <p key={error}>{error}</p>))
         else{
            setRenderedErrors('');
         }
      }, [errors]
   );

   useEffect(
      () => {
      }, [renderedErrors]
   );

   return (
      errors.length > 0 ?
         <div
         className="ui error message"
         style={{
            textAlign: "center",
            padding: "0.25rem 0.25rem",
            marginTop: "0.5rem",
         }}
      >
         {renderedErrors}
      </div>
         : null
   );
};

export default ErrorList;