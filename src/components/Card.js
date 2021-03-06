import React from 'react';

const Card = ({width, children, padding, stackable}) => {

  return (

    <div className={`ui grid ${stackable}`} style={{padding: `${padding}`}}>
       <div className="ui container" style={{width: `${width}`, paddingBottom: "1em"}}>
          <div className="ui grey fluid card" style={{}}>
            {children}
          </div>
        </div>
      </div>
  );

};

export default Card;
