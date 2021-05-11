import React from 'react';
import '../css/Button.css';

const Button = ({className, children, onClick, type, onSubmit, disabled, style}) => {

  return(

    disabled ?

    ' '

    :

    <button
      className={className}
      onClick={onClick}
      type={type}
      onSubmit={onSubmit}
      style={style}>
        {children}
    </button>


  );

};

export default Button;
