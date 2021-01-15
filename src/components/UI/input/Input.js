import React from "react";

import classes from "./input.module.scss";

const Input = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
      required={props.required}
      className={classes.input}
      disabled={props.disabled}
      placeholder={props.placeholder}
      autoComplete="off"
    ></input>
  );
};

export default Input;
