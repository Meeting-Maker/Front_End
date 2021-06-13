import React from 'react';
import '../css/Button.css';

const Button = ({className, children, onClick, type, onSubmit, disabled, style, form}) => {

  return(
    disabled ?
    ' '
    :
    <button
      className={className}
      onClick={onClick}
      type={type}
      onSubmit={onSubmit}
      style={style}
      form={form}
      >
        {children}
    </button>
  );

};

export default Button;
