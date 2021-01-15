import React, { useState, Fragment, useMemo } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import { connect } from "react-redux";

import MyFormikInput from "../../../../utility/myFormikInput/MyFormikInput";
import Input from "../../../UI/input/Input";
import Modal from "../../../UI/modal/Modal";
import Button from "../../../UI/button/Button";
import classes from "./editRectangularTableModal.module.scss";
import MyFormikCheckbox from "../../../../utility/myFormikCheckbox/MyFormikCheckbox";
import ErrorBox from "../../../UI/errorBox/ErrorBox";
import * as actions from "../../../../actions/index";
import Backdrop from "./../../../UI/backdrop/Backdrop";

const EditProjectModal = (props) => {
  const [error, setError] = useState(false);

  const restOfRotationDivision = props.rotationTimes % 2;

  const memoizedSidesRules = useMemo(() => {
    let top, right, left, bottom;
    if (props.rotationTimes % 4 === 0) {
      top = !props.rules.top;
      right = !props.rules.right;
      bottom = !props.rules.bottom;
      left = !props.rules.left;
    } else if (props.rotationTimes % 4 === 1) {
      top = !props.rules.left;
      right = !props.rules.top;
      bottom = !props.rules.right;
      left = !props.rules.bottom;
    } else if (props.rotationTimes % 4 === 2) {
      top = !props.rules.bottom;
      right = !props.rules.left;
      bottom = !props.rules.top;
      left = !props.rules.right;
    } else if (props.rotationTimes % 4 === 3) {
      top = !props.rules.right;
      right = !props.rules.bottom;
      bottom = !props.rules.left;
      left = !props.rules.top;
    }
    return {
      top: top,
      left: left,
      right: right,
      bottom: bottom,
    };
  }, [props.rotationTimes]);

  return (
    <Fragment>
      <Backdrop click={props.onEditModalHide} show={props.isId === props.id} />
      <Modal show={props.isId === props.id}>
        <ErrorBox className={classnames(classes.errorBox, error && classes.errorBoxVisible)}>{error}</ErrorBox>
        <Formik
          initialValues={{
            width: "",
            height: "",
            left: memoizedSidesRules.left,
            right: memoizedSidesRules.right,
            top: memoizedSidesRules.top,
            bottom: memoizedSidesRules.bottom,
          }}
          onSubmit={(values) => {
            if (
              (values.width >= 1 && values.height >= 1 && values.width <= 25 && values.height <= 25) ||
              (values.width === "" && values.height === "")
            ) {
              setError(false);
              let newRotation, width, height;
              if (values.width === "" && values.height === "") {
                width = props.hSeats;
                height = props.vSeats;
                newRotation = 0;
              } else {
                width = values.width < values.height ? values.width : values.height;
                height = values.width >= values.height ? values.width : values.height;
                if (!restOfRotationDivision) {
                  newRotation = values.width < values.height ? 0 : 1;
                } else {
                  newRotation = values.width > values.height ? 0 : 1;
                }
              }

              let top, right, left, bottom;

              if ((props.rotationTimes + newRotation) % 4 === 0) {
                top = !values.top;
                right = !values.right;
                bottom = !values.bottom;
                left = !values.left;
              } else if ((props.rotationTimes + newRotation) % 4 === 1) {
                top = !values.right;
                right = !values.bottom;
                bottom = !values.left;
                left = !values.top;
              } else if ((props.rotationTimes + newRotation) % 4 === 2) {
                top = !values.bottom;
                right = !values.left;
                bottom = !values.top;
                left = !values.right;
              } else if ((props.rotationTimes + newRotation) % 4 === 3) {
                top = !values.left;
                right = !values.top;
                bottom = !values.right;
                left = !values.bottom;
              }

              let newRules = {
                top: top,
                left: left,
                right: right,
                bottom: bottom,
              };

              props.changeTableSizeHandler(
                { width: values.width === "" ? width : width, height: height },
                "rectangular",
                props.id,
                newRotation,
                newRules
              );

              props.onEditModalHide();
            } else if (values.width > 25 || values.height > 25) {
              setError("Maximal amount of seats is 25.");
            } else {
              setError("Minimal amount of seats is 1.");
            }
          }}
          validationSchema={Yup.object({})}
        >
          {() => {
            return (
              <Form className={classes.container}>
                <div className={classes.inputsSection}>
                  <div className={classes.tableSizeInputs}>
                    <p className={classes.caption}>Table size</p>
                    <MyFormikInput
                      name="width"
                      type="number"
                      label="Width:"
                      as={Input}
                      placeholder={restOfRotationDivision ? props.vSeats : props.hSeats}
                    />
                    <MyFormikInput
                      name="height"
                      type="number"
                      label="Height:"
                      placeholder={restOfRotationDivision ? props.hSeats : props.vSeats}
                      as={Input}
                    />
                  </div>
                  <div className={classes.tablePartsInputs}>
                    <p className={classes.caption}>Disable table parts</p>
                    <div className={classes.tableCheckboxes}>
                      <MyFormikCheckbox name="top" text="top" />
                      <MyFormikCheckbox name="right" text="right" />
                      <MyFormikCheckbox name="bottom" text="bottom" />
                      <MyFormikCheckbox name="left" text="left" />
                    </div>
                  </div>
                </div>
                <Button type="submit" className={classes.button}>
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </Fragment>
  );
};

const mapDisptachToProps = (dispatch) => {
  return {
    onEditModalHide: () => dispatch(actions.editRectangularModalVisibility(false)),
  };
};

const mapStateToProps = (state) => {
  return {
    isEditModal: state.modVis.editModalRectangularVisible,
    isId: state.modVis.id,
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(EditProjectModal);
