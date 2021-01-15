import React, { useRef, Fragment } from "react";

import classes from "./roundTable.module.scss";
import RoundSeat from "./roundSeat/RoundSeat";
import TableFunctionsLink from "./../tableFunctionsLink/TableFunctionsLink";
import EditRoundTableModal from "./../editRoundTableModal/EditRoundTableModal";

const RoundTable = (props) => {
  const table = useRef(null);
  const tableSize = 120 + (props.seats - 4) * 11;
  const angle = 360 / props.seats;

  let tablesAmount = Array(props.seats).fill();

  const roundSeats = tablesAmount.map((el, index) => {
    const rot = index * angle;
    const seatLabel = props.seatLabels[index];
    return (
      <RoundSeat
        key={index}
        rot={rot}
        angle={angle}
        tableSize={tableSize}
        index={index}
        seatLabel={seatLabel}
        tableId={props.id}
        rotationTimes={props.rotationTimes}
      ></RoundSeat>
    );
  });

  return (
    <Fragment>
      <div
        ref={table}
        className={classes.container}
        style={{
          width: `${tableSize}px`,
          height: `${tableSize}px`,
          top: `${props.yPosition}px`,
          left: `${props.xPosition}px`,
          transform: `rotate(${props.rotation}deg)`,
        }}
        onMouseDown={(event) => {
          props.mouseDownHandler(event, table);
        }}
        onMouseOver={() => {
          table.current.style.zIndex = "23";
        }}
        onMouseLeave={() => (table.current.style.zIndex = "19")}
        data-id={props.id}
        data-type="round"
      >
        <TableFunctionsLink rot={angle} id={props.id} type="round" rotation={props.rotation} />
        {roundSeats}
      </div>
      <EditRoundTableModal seats={props.seats} id={props.id} changeTableSizeHandler={props.changeTableSizeHandler} />
    </Fragment>
  );
};

export default RoundTable;
