import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./logoBar.module.scss";

const LogoBar = () => {
  return (
    <div className={classes.container}>
    <NavLink className={classes.link} to="/">
      <div className={classes.logo}>Wedding</div>
      </NavLink>
      <div className={classes.icons}>
        <NavLink className={classes.link} to="/help">
          <i class="far fa-question-circle"></i>
          <span className={classes.text}>Help</span>
        </NavLink>
        <NavLink className={classes.link} to="/contact">
          <i class="fas fa-envelope"></i>
          <span className={classes.text}>Contact</span>
        </NavLink>
      </div>
    </div>
  );
};

export default LogoBar;
