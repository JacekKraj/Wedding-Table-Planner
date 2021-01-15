import React from "react";
import classnames from "classnames";

import classes from "./navButton.module.scss";

const NavButton = (props) => {
  return (
    <div className={classes.pageButton} onClick={props.click}>
      {props.children}
      <span className={classnames(classes.buttonName, props.fullNav && classes.buttonNameVisible)}>{props.text}</span>
      <span className={classnames(classes.info, !props.fullNav && classes.buttonInfo)}>{props.text}</span>
    </div>
  );
};

export default NavButton;
