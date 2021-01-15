import React, { useRef, Fragment } from "react";
import { connect } from "react-redux";

import classes from "./rectangularTable.module.scss";
import RectangularSit from "./rectangularSit/RectangularSit";
import TableFunctionsLink from "./../tableFunctionsLink/TableFunctionsLink";
import EditRectangularTableModal from "../editRectangularTableModal/EditRectangularTableModal";

const RectangularTable = (props) => {
  const table = useRef(null);

  let topIndex = 0;
  let rightIndex = 0;
  let bottomIndex = 0;
  let leftIndex = 0;

  const createRow = (rules, div, rowIndex) => {
    const tableColumns = Array(props.hSeats + 2).fill();

    let row;
    row = tableColumns.map((el, index) => {
      let sit;
      if (props.hSeats + 2 - 1 === index || index === 0) {
        const seatLabel = index === 0 ? props.seatLabels["left"][leftIndex] : props.seatLabels["right"][rightIndex];

        sit = (
          <RectangularSit
            visibility={(rowIndex === 1 || rowIndex === props.vSeats + 2) && classes.cornerSeat}
            borderStyle={
              rowIndex === 2
                ? index === 0
                  ? classes.firstLeftSeatBorder
                  : classes.firstRightSeatBorder
                : index === 0
                ? classes.otherLeftSeatBorder
                : classes.otherRightSeatBorder
            }
            notAllowed={index === 0 ? rules.left : rules.right}
            key={index}
            rot={props.rotation}
            rotTimes={props.rotationTimes}
            index={index === 0 ? leftIndex : rightIndex}
            seatLabel={seatLabel}
            position={index === 0 ? "left" : "right"}
            tableId={props.id}
          />
        );
        index === 0 ? leftIndex++ : rightIndex++;
      } else if (div) {
        sit = <div className={classes.emptyTablePlace} key={index} rot={props.rotation}></div>;
      } else if (!div) {
        const seatLabel = rowIndex === 1 ? props.seatLabels["top"][topIndex] : props.seatLabels["bottom"][bottomIndex];
        sit = (
          <RectangularSit
            notAllowed={rowIndex === 1 ? rules.top : rules.bottom}
            borderStyle={
              index === 1
                ? rowIndex === 1
                  ? classes.firstTopSeatBorder
                  : classes.firstBottomSeatBorder
                : rowIndex === 1
                ? classes.otherTopSeatBorder
                : classes.otherBottomSeatBorder
            }
            position={rowIndex === 1 ? "top" : "bottom"}
            key={index}
            rot={props.rotation}
            index={rowIndex === 1 ? topIndex : bottomIndex}
            seatLabel={seatLabel}
            rotTimes={props.rotationTimes}
            tableId={props.id}
          />
        );
        rowIndex === 1 ? topIndex++ : bottomIndex++;
      }
      return sit;
    });
    return row;
  };

  const createTable = () => {
    const tableRows = Array(props.vSeats + 2).fill();

    const table = tableRows.map((el, index) => {
      let row;

      if (index === 0 || index === props.vSeats + 2 - 1) {
        row = createRow({ left: !props.rules.left, top: !props.rules.top, right: !props.rules.right, bottom: !props.rules.bottom }, false, index + 1);
      } else {
        row = createRow({ left: !props.rules.left, top: !props.rules.top, right: !props.rules.right, bottom: !props.rules.bottom }, true, index + 1);
      }
      return row;
    });
    return table;
  };

  return (
    <Fragment>
      <div
        draggable="true"
        ref={table}
        onMouseOver={() => {
          table.current.style.zIndex = "22";
        }}
        onMouseLeave={() => (table.current.style.zIndex = "1")}
        data-id={props.id}
        data-type="rectangular"
        onMouseDown={(event) => {
          props.mouseDownHandler(event, table, props.rotationTimes);
        }}
        className={classes.table}
        style={{
          width: `${(props.hSeats + 2) * 39}px`,
          height: `${(props.vSeats + 2) * 39}px`,
          transform: `rotate(${props.rotation}deg)`,
          top: `${props.yPosition}px`,
          left: `${props.xPosition}px`,
        }}
      >
        <TableFunctionsLink rot="90" type="rectangular" id={props.id} rotation={props.rotation} />

        {createTable()}
      </div>
      {props.isEditModal ? (
        <EditRectangularTableModal
          vSeats={props.vSeats}
          hSeats={props.hSeats}
          rotationTimes={props.rotationTimes}
          changeTableSizeHandler={props.changeTableSizeHandler}
          id={props.id}
          rules={props.rules}
        />
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isEditModal: state.modVis.editModalRectangularVisible,
  };
};

export default connect(mapStateToProps)(RectangularTable);
