import React from 'react';
import '../css/Card.css';

const Card = ({width, children, padding}) => {

  return (

    <div className={`ui grid`} style={{padding: `${padding}`}}>
       <div className="ui container" style={{width: `${width}`}}>
          <div className="ui grey fluid card">

            {children}

          </div>
        </div>
      </div>
  );

};

export default Card;
