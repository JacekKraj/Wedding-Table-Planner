import React from "react";
import classnames from "classnames";

import classes from "./infoModal.module.scss";
import Button from "../button/Button";

const InfoModal = (props) => {
  return (
    <div className={classnames(classes.container, props.show && classes.containerVisible)}>
      <p>{props.text}</p>
      <div className={classes.buttons}>
        <Button className={classnames(classes.btn, classes.btnSave)} onClick={props.positiveClick}>
          {props.btnPositiveText}
        </Button>
        <Button className={classnames(classes.btn, classes.btnLeave)} onClick={props.negativeClick}>
          {props.btnNegativeText}
        </Button>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => {
//     return {
//         onLeave: state.modVis.leaveHandler
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onSaveCheckModalShow: () => dispatch(actions.editSaveCheckModalVisibility(false))
//     }
// }

export default InfoModal;
