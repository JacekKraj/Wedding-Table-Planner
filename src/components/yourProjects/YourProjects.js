import React, { Fragment, useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import firebase from "firebase";

import MainPageLogoBar from "./../mainPageLogoBar/MainPageLogoBar";
import classes from "./yourProjects.module.scss";
import ProjectLink from "./projectLink/ProjectLink";
import Backdrop from "./../UI/backdrop/Backdrop";
import Modal from "./../UI/modal/Modal";
import AddNewProject from "./addNewProject/AddNewProject";
import Spinner from "./../UI/spinner/Spinner";
import { ProjectsContext } from "./../../App";
import InfoModal from "./../UI/infoModal/InfoModal";
import { showSuccessToast, showFailToast } from "./../../utility/Toasts/toasts";

const YourProjects = (props) => {
  const [projects, setProjects] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectPath, setProjectPath] = useState(null);

  const projs = useContext(ProjectsContext);

  const openDeleteModalHandler = (path) => {
    setShowDeleteModal(true);
    setProjectPath(path);
  };

  useEffect(() => {
    if (props.fireUser) {
      if (projs.projectsNames) {
        const arr = Array.from(Object.keys(projs.projectsNames));
        let project = arr.map((el, index) => {
          return <ProjectLink key={index} projectName={el} openDeleteModalHandler={openDeleteModalHandler} />;
        });
        setProjects(project);
      } else {
        setProjects(true);
      }
    }
  }, []);

  const removeProjectHandler = () => {
    firebase
      .database()
      .ref(`${props.fireUser.uid}/${projectPath}`)
      .remove()
      .then(() => {
        setShowModal(false);
        showSuccessToast(
          <div className={classes.toast}>
            <p>
              Project has been removed<i class="far fa-check-circle"></i>
            </p>
          </div>
        );
        projs.reloadProjects(Math.random());
      })
      .catch((e) => {
        showFailToast(
          <div className={classes.toast}>
            <p>{e.message}</p>
          </div>
        );
      });
  };

  return (
    <Fragment>
      {showDeleteModal ? (
        <InfoModal
          show={showDeleteModal}
          positiveClick={() => {
            setShowDeleteModal(false);
          }}
          negativeClick={removeProjectHandler}
          btnPositiveText="Cancel"
          btnNegativeText="Delete"
          text="Are your sure you want to delete this project? All data will be lost."
        />
      ) : null}
      <Backdrop
        show={showModal || showDeleteModal}
        click={() => {
          setShowDeleteModal(false);
          setShowModal(false);
        }}
      ></Backdrop>
      <Modal show={showModal}>
        <AddNewProject projectsNames={projs.projectsNames} />
      </Modal>
      <MainPageLogoBar />
      <div className={classes.container}>
        <h2 className={classes.description}>Your projects</h2>
        <div className={classes.yourProjects}>
          {projects ? (
            <Fragment>
              <div
                className={classes.newProject}
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <div className={classes.text}>
                  <i class="fas fa-plus" className={classes.icon}></i>
                  <p className={classes.desc}>Add project</p>
                </div>
              </div>
              {projects}
            </Fragment>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    fireUser: state.auth.fireUser,
  };
};

export default connect(mapStateToProps)(YourProjects);
