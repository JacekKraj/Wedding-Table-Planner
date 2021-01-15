import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import classes from "./projectLink.module.scss";

const ProjectLink = (props) => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div
          className={classes.iconContainer}
          onClick={() => {
            props.openDeleteModalHandler(props.projectName);
          }}
        >
          <i class="fas fa-times"></i>
        </div>
        <NavLink to={`/${props.projectName}`} exact className={classes.anchorContainer}>
          <p className={classes.name}>{props.projectName}</p>
        </NavLink>
      </div>
    </Fragment>
  );
};

export default ProjectLink;
