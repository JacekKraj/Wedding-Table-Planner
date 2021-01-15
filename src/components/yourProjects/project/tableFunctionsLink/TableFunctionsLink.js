import React from "react";

import classes from "./tableFunctionsLink.module.scss";
import TableFunctions from "./tableFunctions/TableFunctions";

const TableFunctionsLink = (props) => {
  return (
    <div className={classes.tableFunctions} onMouseDown={(e) => e.stopPropagation()}>
      <i class="fas fa-cog"></i>
      <div
        className={classes.functions}
        style={{
          transform: `rotate(-${props.rotation}deg) `,
        }}
      >
        <TableFunctions id={props.id} type={props.type} rot={props.rot} showEditModal={props.showEditModal} />
      </div>
    </div>
  );
};

export default TableFunctionsLink;
