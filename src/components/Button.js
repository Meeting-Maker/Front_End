import React from 'react';
import '../css/Button.css';

const Button = ({className, text, onClick, fontSize, type, onSubmit}) => {

  return(

    <button className={className} onClick={onClick} type={type} onSubmit={onSubmit}>{text}</button>

  );

};

export default Button;
