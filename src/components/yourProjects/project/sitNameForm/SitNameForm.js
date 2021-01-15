import React, { useContext } from "react";
import { Formik, Form } from "formik";
import classnames from "classnames";

import classes from "./sitNameForm.module.scss";
import Input from "./../../../UI/input/Input";
import Button from "./../../../UI/button/Button";
import MyFormikInput from "./../../../../utility/myFormikInput/MyFormikInput";
import { SeatLabelsContext } from "./../../project/Project";

const SitNameForm = (props) => {
  const seatLabels = useContext(SeatLabelsContext);
  return (
    <div
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      className={classnames(classes.sitName, !props.notAllowed && props.className)}
      style={{
        transform: `rotate(-${
          props.type === "rectangular" ? (props.rotate ? props.rotate : 0) : props.rotate + props.rotationTimes * props.angle
        }deg)`,
        transformOrigin: `left bottom`,
      }}
    >
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => {
          const words = values.name.split(" ");
          const newWords = words.map((el) => {
            if (el.length > 9) {
              let firstPart = el.slice(0, 8).concat("-");
              let secondPart = el.slice(8);
              return firstPart.concat(" ", secondPart);
            } else {
              return el;
            }
          });
          props.type === "rectangular"
            ? seatLabels.addRectangularSeatLabelHandler(newWords.join(" "), props.tableId, props.index, props.position, "rectangular")
            : seatLabels.addRoundSeatLabelHandler(newWords.join(" "), props.tableId, props.index, "round");
        }}
      >
        {() => {
          return (
            <Form className={classes.formContainer}>
              <MyFormikInput name="name" type="text" label="Name:" required={false} as={Input} />
              <Button className={classes.button} type="submit">
                Add
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SitNameForm;
