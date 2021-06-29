import React from "react";
import "./Button.scss";
function Button(props) {
  const { variant, size, children, ...rest } = props;

  const btn_variant = variant === "primary" ? "btn-primary" : null;
  const btn_size = size === "small" ? "btn-small" : null;

  return (
    <>
      <button className={`btn ${btn_variant} ${btn_size}`} {...rest}>
        {children}
      </button>
    </>
  );
}

export default Button;
