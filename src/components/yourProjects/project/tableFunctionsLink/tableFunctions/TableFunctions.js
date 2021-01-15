import React, { Fragment, useContext } from "react";
import {connect} from 'react-redux';

import TableFunction from "./tableFunction/TableFunction";
import { TableFunctionsContext } from "../../Project";
import * as actions from './../../../../../actions/index'

const TableFunctions = (props) => {
  const tableFuncs = useContext(TableFunctionsContext);

  return (
    <Fragment>
      <TableFunction name="Edit" click={() => {
          if(props.type=== "rectangular"){
          props.onEditRectangularModalShow(props.id)
          } else if( props.type === "round"){
            props.onEditRoundModalShow(props.id)
          }
        }}>
        <i class="fas fa-pen"></i>
      </TableFunction>
      <TableFunction
        name="Rotate"
        click={() => tableFuncs.rotateTable(props.id, props.type, props.rot)}
      >
        <i class="fas fa-sync-alt"></i>
      </TableFunction>
      <TableFunction
        name="Remove"
        click={() => tableFuncs.removeTable(props.id, props.type)}
      >
        <i class="fas fa-trash"></i>
      </TableFunction>
    </Fragment>
  );
};

const mapDisptachToProps = dispatch => {
  return {
    onEditRectangularModalShow: (id) => dispatch(actions.editRectangularModalVisibility(id,true)),
    onEditRoundModalShow: (id) => dispatch(actions.editRoundModalVisibility(id,true))

  }
}

export default connect(null,mapDisptachToProps)(TableFunctions);
