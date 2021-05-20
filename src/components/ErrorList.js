import React, {useEffect, useState} from 'react';

const ErrorList = ({errors}) => {
   const [renderedErrors, setRenderedErrors] = useState('');

   useEffect(
      () => {
         if(errors.length > 0) setRenderedErrors(errors.map(error => <p key={error}>{error}</p>));
      }, [errors]
   );

   useEffect(
      () => {

      }, [renderedErrors]
   );

   return (
      <div
         className="ui error message"
         style={{
            textAlign: "center",
            padding: "0.25rem 0.25rem",
            marginTop: "0.5rem",
            display: errors.length > 0 ? "block" : "none"
         }}
      >
         {renderedErrors}
      </div>
   );
};

export default ErrorList;