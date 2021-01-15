import React from "react";
import { Field, useField } from "formik";
import classnames from "classnames";

import classes from "./myFormikInput.module.scss";

const MyFormikInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={classnames(classes.container, props.className)}>
      <label htmlFor={props.name} className={classes.label}>
        {label}
      </label>
      {meta.touched && meta.error ? <div className={classes.error}>{meta.error}</div> : null}
      <Field {...field} {...props} isError={meta.error !== "Required" && meta.error !== undefined ? true : false} />
    </div>
  );
};

export default MyFormikInput;
