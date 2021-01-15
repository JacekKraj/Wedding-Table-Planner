import React from "react";
import classnames from "classnames";

import classes from "./rectangularSit.module.scss";
import SitNameForm from "./../../sitNameForm/SitNameForm";

const RectangularSit = (props) => {
  const rotTimes = props.rotTimes % 4;

  return (
    <div
      className={classnames(
        classes.sit,
        props.seatLabel && !props.notAllowed && classes.taken,
        props.notAllowed && classes.notAllowed,
        props.visibility,
        props.borderStyle
      )}
    >
      <span className={classnames(rotTimes === 1 && classes.rot1, rotTimes === 2 && classes.rot2, rotTimes === 3 && classes.rot3, classes.sitLabel)}>
        {props.notAllowed ? null : props.seatLabel}
      </span>
      <SitNameForm
        notAllowed={props.notAllowed}
        position={props.position}
        className={classes.sitNameVisible}
        rotate={props.rot}
        labelRotate={180}
        index={props.index}
        tableId={props.tableId}
        type="rectangular"
      />
    </div>
  );
};

export default RectangularSit;
