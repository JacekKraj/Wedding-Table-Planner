import React from "react";
import classnames from "classnames";

import classes from "./modal.module.scss";

const Modal = (props) => {
  return <div className={classnames(classes.modal, props.show && classes.show)}>{props.children}</div>;
};

export default Modal;
