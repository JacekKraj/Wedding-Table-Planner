import React from "react";
import classnames from "classnames";

import classes from "./errorBox.module.scss";

const ErrorBox = (props) => {
  return <div className={classnames(classes.errorBox, props.className)}>{props.children}</div>;
};

export default ErrorBox;
