import React, { useState, Fragment } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import { connect } from "react-redux";
import firebase from "firebase";

import MyFormikInput from "./../../../utility/myFormikInput/MyFormikInput";
import Input from "./../../UI/input/Input";
import classes from "./addNewProject.module.scss";
import Button from "./../../UI/button/Button";
import ErrorBox from "./../../UI/errorBox/ErrorBox";

const AddNewProject = (props) => {
  const [tablesNumber, setTablesNumber] = useState(false);
  const [tablesErrorMessage, setTablesErrorMessage] = useState("");

  return (
    <Formik
      initialValues={{
        projectName: "",
        round: false,
        rectangular: false,
        roundNumber: "",
        rectangularNumber: "",
      }}
      validationSchema={Yup.object({
        projectName: Yup.string().required("Required."),
      })}
      onSubmit={(values) => {
        let nameError = false;
        let el;
        for (el in props.projectsNames) {
          if (values.projectName.trim() === el.trim()) {
            nameError = true;
            setTablesNumber(true);
            setTablesErrorMessage("This name is already ocupied.");
          }
        }
        let rectangularTablesNumber = 0;
        let roundTablesNumber = 0;
        let rectangularPosition = [];
        let roundPosition = [];
        let xPosition = 0;
        if (values.rectangular) {
          rectangularTablesNumber = values.rectangularNumber === "" ? 1 : values.rectangularNumber;
          if (rectangularTablesNumber > 3) {
            setTablesNumber(true);
            setTablesErrorMessage("Amount of tables in basic settings can't be higher than 3.");
            return;
          }

          for (let i = 1; i <= rectangularTablesNumber; i++) {
            xPosition += 120;
            rectangularPosition.push({
              horizontalSeats: 1,
              verticalSeats: 10,
              tableNr: i - 1,
              tablePositionX: xPosition,
              tablePositionY: 100,
              rotation: 0,
              rotationTimes: 0,
              rotatedManually: false,
              rules: { top: true, bottom: true, left: true, right: true },
              seatLabels: { top: { 0: "" }, right: { 0: "" }, bottom: { 0: "" }, left: { 0: "" } },
            });
          }
        }
        if (values.roundNumber) {
          roundTablesNumber = values.roundNumber === "" ? 1 : values.roundNumber;
          if (roundTablesNumber > 3) {
            setTablesNumber(true);
            setTablesErrorMessage("Amount of tables in basic settings can't be higher than 3.");
            return;
          }

          for (let i = 1; i <= roundTablesNumber; i++) {
            xPosition += 240;
            roundPosition.push({
              tableNr: i - 1,
              tablePositionX: xPosition,
              tablePositionY: 120,
              rotation: 0,
              rotationTimes: 0,
              seats: 7,
              seatLabels: { 0: "" },
            });
          }
        }

        const projectData = {
          rectangular: {
            number: rectangularTablesNumber,
            tables: rectangularPosition,
          },
          round: {
            number: roundTablesNumber,
            tables: roundPosition,
          },
        };
        if (!nameError) {
          firebase
            .database()
            .ref(`${props.fireUser.uid}/${values.projectName.trim()}`)
            .set(projectData)
            .then((response) => {
              window.location.reload();
            })
            .catch((error) => {});
        }
      }}
    >
      {({ values }) => {
        return (
          <Fragment>
            <ErrorBox className={classnames(classes.errorBox, tablesNumber && classes.errorVisible)}>{tablesErrorMessage}</ErrorBox>
            <Form>
              <MyFormikInput name="projectName" type="text" label="Project name:" as={Input} className={classes.input} />
              <h2 className={classes.sectionName}>Choose basic settings</h2>
              <div className={classes.chooseTableTypesContainer}>
                <div className={classes.chooseTableType}>
                  <Field type="checkbox" name="round" className={classes.acceptCheckbox} />
                  <span className={classes.checkboxName}>Round tables</span>
                </div>
                <div className={classes.chooseTableType}>
                  <Field type="checkbox" name="rectangular" className={classes.acceptCheckbox} />
                  <span className={classes.checkboxName}>Rectangular tables</span>
                </div>
              </div>
              <div className={classes.chooseTablesNumber}>
                <MyFormikInput
                  name="roundNumber"
                  type="number"
                  label="Number of tables:"
                  as={Input}
                  disabled={!values.round}
                  className={classnames(classes.numbInput, values.round && classes.enabled)}
                />
                <MyFormikInput
                  name="rectangularNumber"
                  type="number"
                  label="Number of tables:"
                  as={Input}
                  disabled={!values.rectangular}
                  className={classnames(classes.numbInput, values.rectangular && classes.enabled)}
                />
              </div>
              <Button type="submit" className={classes.button}>
                Get started
              </Button>
            </Form>
          </Fragment>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  return {
    fireUser: state.auth.fireUser,
  };
};

export default connect(mapStateToProps)(AddNewProject);
