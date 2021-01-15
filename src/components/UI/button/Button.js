import React from "react";
import classnames from "classnames";

import classes from "./button.module.scss";

const Button = (props) => {
  return (
    <button type={props.type} className={classnames(props.className && props.className, classes.button)} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
