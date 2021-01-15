import React, { Fragment, useState, useContext } from "react";
import classnames from "classnames";
import { connect } from "react-redux";

import classes from "./yourProfile.module.scss";
import AddNewProject from "./../../../addNewProject/AddNewProject";
import Modal from "./../../../../UI/modal/Modal";
import Backdrop from "./../../../../UI/backdrop/Backdrop";
import { ProjectsContext } from "./../../../../../App";
import * as actions from "./../../../../../actions/index";

const YourProfile = (props) => {
  const [showProfile, setShowProfile] = useState(false);
  const emailFirstLetter = props.email.slice(0, 1);
  const projects = useContext(ProjectsContext);

  const showProfileHandler = () => {
    setShowProfile(!showProfile);
  };

  const checkIfSavedHandler = () => {
    if (props.projectSaved) {
      props.onLogout();
    } else {
      props.onSaveCheckModalShow(true, props.onLogout);
    }
  };

  return (
    <Fragment>
      <Backdrop show={props.isNewProjectModal} click={props.onNewProjectModalHide} />
      <Modal show={props.isNewProjectModal}>
        <AddNewProject projectsNames={projects.projectsNames} />
      </Modal>
      <div
        className={classnames(
          classes.yourProfile,
          (props.isNewProjectModal || props.isEditRectangularModal || props.isEditRoundModal || props.isSaveCheckModalVisible) &&
            classes.yourProfileWhite,
          showProfile && classes.profileZIndex
        )}
      >
        <div className={classes.yourProfileToggle} onClick={showProfileHandler}>
          <div className={classes.profileImage}>{emailFirstLetter}</div>
          <div className={classes.profileCaption}>Your profile</div>
          <i class="fas fa-sort"></i>
        </div>
        <div className={classnames(classes.yourProfileInfo, showProfile && classes.yourProfileInfoVisible)}>
          <p className={classes.email}>{props.email}</p>
          <div className={classes.profileLink} onClick={props.checkIfSavedHandler}>
            Your projects
          </div>
          <div
            className={classes.profileLink}
            onClick={() => {
              showProfileHandler();
              props.onNewProjectModalShow();
            }}
          >
            New project
          </div>
          <div className={classes.profileLink} onClick={checkIfSavedHandler}>
            Log out
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapDisptachToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
    onNewProjectModalShow: () => dispatch(actions.showNewProjectModal()),
    onNewProjectModalHide: () => dispatch(actions.hideNewProjectModal()),
    onSaveCheckModalShow: (show, onLeave) => dispatch(actions.editSaveCheckModalVisibility(show, onLeave)),
  };
};

const mapStateToProps = (state) => {
  return {
    isNewProjectModal: state.modVis.newProjectModalVisible,
    isEditRectangularModal: state.modVis.editModalRectangularVisible,
    isEditRoundModal: state.modVis.editModalRoundVisible,
    isSaveCheckModalVisible: state.modVis.saveCheckModalVisible,
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(YourProfile);
