import React, { useState, Fragment } from "react";
import { useHistory } from "react-router";
import classnames from "classnames";
import { connect } from "react-redux";
import { useReactToPrint } from "react-to-print";
import ReactToPrint from "react-to-print";

import classes from "./navigation.module.scss";
import YourProfile from "./yourProfile/YourProfile";
import * as actions from "./../../../../actions/index";
import NavButton from "./navButton/NavButton";

const Navigation = (props) => {
  const history = useHistory();
  const [fullNav, setFullNav] = useState(false);

  const returnToProjects = () => {
    history.push("/yourProjects");
  };

  const handlePrint = useReactToPrint({
    content: () => props.projRef,
  });

  const checkIfSavedHandler = () => {
    if (props.projectSaved) {
      returnToProjects();
    } else {
      props.onSaveCheckModalShow(true, returnToProjects);
    }
  };

  const showNavHandler = () => {
    setFullNav(!fullNav);
  };

  let logo = <p className={classes.logo}>W</p>;

  logo = fullNav ? <p className={classes.fullLogo}>Wedding</p> : logo;

  let navTurner = (
    <div className={classnames(classes.turner, classes.turnerOn)} onClick={showNavHandler}>
      <i class="fas fa-angle-right"></i>
    </div>
  );

  navTurner = fullNav ? (
    <div className={classnames(classes.turner, classes.turnerOff)} onClick={showNavHandler}>
      <i class="fas fa-angle-left"></i>
    </div>
  ) : (
    navTurner
  );

  return (
    <Fragment>
      <YourProfile checkIfSavedHandler={checkIfSavedHandler} email={props.email} projectSaved={props.projectSaved} />
      <div className={classnames(classes.container, fullNav && classes.containerFull)}>
        {logo}
        <div className={classes.pageButtons}>
          <NavButton click={props.clearProjectDataHandler} text="Clear Project" fullNav={fullNav}>
            <i class="fas fa-trash"></i>
          </NavButton>
          <NavButton click={props.addRectangularTableHandler} text="Add rect table" fullNav={fullNav}>
            <div className={classes.rectangle}></div>
          </NavButton>
          <NavButton click={props.addRoundTableHandler} text="Add round table" fullNav={fullNav}>
            <div className={classes.round}></div>
          </NavButton>
          <NavButton click={props.saveProjectDataHandler} text="Save Changes" fullNav={fullNav}>
            <i class="fas fa-save"></i>
          </NavButton>

          <NavButton click={handlePrint} text="Print Project" fullNav={fullNav}>
            <i class="fas fa-print"></i>
          </NavButton>
        </div>
        <div className={classes.returnButton} onClick={checkIfSavedHandler}>
          <i class="fas fa-arrow-left"></i>
          <span className={classnames(classes.buttonName, fullNav && classes.buttonNameVisible)}>Return to projects</span>
          <span className={classnames(classes.info, !fullNav && classes.buttonInfo, classes.return)}>Return to projects</span>
        </div>
        {navTurner}
      </div>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSaveCheckModalShow: (show, onLeave) => dispatch(actions.editSaveCheckModalVisibility(show, onLeave)),
  };
};

export default connect(null, mapDispatchToProps)(Navigation);
