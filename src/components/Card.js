import React from 'react';

const Card = ({width, children}) => {

  return (

    <div className="ui centered grid" style={{paddingTop: "10rem"}}>
       <div className="ui container" style={{width: `${width}`}}>
          <div className="ui grey fluid card">

            {children}

          </div>
        </div>
      </div>
  );

};

export default Card;
