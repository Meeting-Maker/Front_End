import React from 'react';
import '../css/Card.css';

const Card = ({width, children, padding}) => {

  return (

    <div className={`ui grid`} style={{padding: `${padding}`}}>
       <div className="ui container" style={{width: `${width}`, paddingBottom: "1em"}}>
          <div className="ui grey fluid card" style={{}}>
            {children}
          </div>
        </div>
      </div>
  );

};

export default Card;
