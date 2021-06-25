import React from "react";
import "./Button.scss";
function Button(props) {
  const { variant, size, children, ...rest } = props;
  return (
    <>
      <button class={`btn ${variant} ${size}`} {...rest}>
        {children}
      </button>
    </>
  );
}

export default Button;
