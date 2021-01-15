import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import { connect } from "react-redux";

import MyFormikInput from "../../../../utility/myFormikInput/MyFormikInput";
import Input from "../../../UI/input/Input";
import Modal from "../../../UI/modal/Modal";
import Button from "../../../UI/button/Button";
import classes from "./editRoundTableModal.module.scss";
import ErrorBox from "../../../UI/errorBox/ErrorBox";
import * as actions from "../../../../actions/index";
import Backdrop from "./../../../UI/backdrop/Backdrop";

const EditProjectModal = (props) => {
  const [error, setError] = useState(false);

  return (
    <Fragment>
      <Backdrop show={props.isId === props.id ? props.isEditModal : false} click={props.onEditModalHide} />
      <Modal show={props.isId === props.id ? props.isEditModal : false}>
        <ErrorBox className={classnames(classes.errorBox, error && classes.errorBoxVisible)}>{error}</ErrorBox>
        <Formik
          initialValues={{
            places: "",
          }}
          onSubmit={(values) => {
            if ((values.places >= 3 && values.places <= 25) || values.places === "") {
              setError(false);
              props.changeTableSizeHandler(values.places, props.id, "round");
              props.onEditModalHide();
            } else if (values.places) {
              setError("Maximal amount of seats is 25.");
            } else {
              setError("Minimal amount of seats is 3.");
            }
          }}
          validationSchema={Yup.object({})}
        >
          {() => {
            return (
              <Form className={classes.container}>
                <p className={classes.caption}>Table size</p>
                <MyFormikInput name="places" type="number" label="Places:" as={Input} placeholder={props.seats} />
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
    onEditModalHide: () => dispatch(actions.editRoundModalVisibility(false)),
  };
};

const mapStateToProps = (state) => {
  return {
    isEditModal: state.modVis.editModalRoundVisible,
    isId: state.modVis.id,
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(EditProjectModal);
