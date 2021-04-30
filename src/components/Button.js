import React from 'react';
import '../css/Button.css';

const Button = ({className, children, onClick, fontSize, type, onSubmit}) => {

  return(

    <button
      className={className}
      onClick={onClick}
      type={type}
      onSubmit={onSubmit}>
        {children}
    </button>

  );

};

export default Button;
