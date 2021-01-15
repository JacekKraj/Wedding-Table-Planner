import React, { useRef } from "react";
import classnames from "classnames";

import classes from "./roundSeat.module.scss";
import SitNameForm from "./../../sitNameForm/SitNameForm";

const RoundSeat = (props) => {
  const seat = useRef(null);

  return (
    <div
      ref={seat}
      className={classnames(classes.seat, props.seatLabel && classes.taken)}
      style={{
        transform: ` rotate(${props.rot}deg )  translate(${props.tableSize / 2 - 17}px, -20px)`,
        transformOrigin: `left top`,
      }}
      onMouseOver={() => {
        seat.current.style.zIndex = "21";
      }}
      onMouseLeave={() => {
        seat.current.style.zIndex = "1";
      }}
    >
      <span className={classes.seatLabel} style={{ transform: `rotate(-${props.rot}deg)` }}>
        {props.seatLabel}
      </span>
      <SitNameForm
        className={classes.seatNameVisible}
        rotate={props.rot}
        rotationTimes={props.rotationTimes}
        angle={props.angle}
        tableId={props.tableId}
        index={props.index}
        type="round"
      />
    </div>
  );
};

export default RoundSeat;
