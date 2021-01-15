import React from "react";
import { Field } from "formik";

import classes from "./myFormikCheckbox.module.scss";

const MyFormikCheckbox = (props) => {
  return (
    <label>
      <Field type="checkbox" name={props.name} className={classes.acceptCheckbox} />
      <span className={classes.checkboxDesc}>{props.text}</span>
    </label>
  );
};

export default MyFormikCheckbox;
