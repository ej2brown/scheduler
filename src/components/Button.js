import React, { useState } from "react";

import "components/Button.scss";

const classNames = require("classnames"); //library


export default function Button(props) {
  
  const buttonClass = classNames("button", {
    " button--confirm": props.confirm,
    " button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}