import React from "react";
import "./Button.scss";
function Button(props) {
  const { variant, size, backgroundColor, children, ...rest } = props;
  return (
    <>
      <button
        class={`button ${variant} ${size}`}
        style={backgroundColor && { backgroundColor }}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
