import React from "react";
import classnames from "classnames";

import classes from "./backdrop.module.scss";

const Backdrop = (props) => {
  return <div className={classnames(classes.backdrop, props.show && classes.show)} onClick={props.click}></div>;
};

export default Backdrop;
