import React from "react";

import classes from "./tableFunction.module.scss";

const TableFunction = (props) => {
  return (
    <div className={classes.function} onClick={props.click}>
      {props.children}
      <span className={classes.functionName}>{props.name}</span>
    </div>
  );
};

export default TableFunction;
