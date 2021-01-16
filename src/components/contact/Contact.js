import React, { Fragment } from "react";

import classes from "./contact.module.scss";
import LogoBar from "./../logoBar/LogoBar";

const Contact = () => {
  return (
    <Fragment>
      <LogoBar />
      <div className={classes.container}>
        <h1 className={classes.title}>Do you need some help or you aren't sure about something on our page? Contact us and dispel your doubts.</h1>

        <p className={classes.email}>dieticiancenter@gmail.com</p>

        <p className={classes.info}>We will be here to help and answer your questions.</p>
      </div>
    </Fragment>
  );
};

export default Contact;
