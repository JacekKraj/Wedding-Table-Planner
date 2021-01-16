import React from "react";

import classes from "./question.module.scss";

const Question = (props) => {
  return (
    <div className={classes.container}>
      <p className={classes.question}>{props.question}</p>
      <p className={classes.answer}>{props.answer}</p>
    </div>
  );
};

export default Question;
