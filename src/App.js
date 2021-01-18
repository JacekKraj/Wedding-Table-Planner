import React, { Suspense, useEffect, useState, useCallback, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router";
import fire from "./fireConfig";
import firebase from "firebase";
import { connect } from "react-redux";
import * as actions from "./actions/index";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import Spinner from "./components/UI/spinner/Spinner";
import Project from "./components/yourProjects/project/Project";
import { showFailToast } from "./utility/Toasts/toasts";
import classes from "./app.css";

export const ProjectsContext = React.createContext(null);

toast.configure();

const App = (props) => {
  const [projectsRoutes, setProjectsRoutes] = useState(null);
  const [projectsNames, setProjectsNames] = useState(null);
  const [reloadProjectsCondition, setReloadProjectsCondition] = useState(null);

  let projRoutes;

  const Login = React.lazy(() => {
    return import("./components/login/Login");
  });

  const Register = React.lazy(() => {
    return import("./components/register/Register");
  });

  const YourProjects = React.lazy(() => {
    return import("./components/yourProjects/YourProjects");
  });

  const Help = React.lazy(() => {
    return import("./components/help/Help");
  });

  const Contact = React.lazy(() => {
    return import("./components/contact/Contact");
  });

  useEffect(() => {
    props.onAddfireUser(null);
    fire.auth().onAuthStateChanged((response) => {
      if (response) {
        if (firebase.auth().currentUser.emailVerified) {
          const firebaseUser = firebase.auth().currentUser;
          props.onAddfireUser(firebaseUser);
          firebase
            .database()
            .ref(`${firebaseUser.uid}`)
            .once("value")
            .then((snapshot) => {
              setProjectsNames(snapshot.val());
              const arr = snapshot.val() ? Array.from(Object.keys(snapshot.val())) : [];
              projRoutes = arr.map((el, index) => {
                const projectData = snapshot.val()[el];
                return (
                  <Route
                    key={index}
                    exact
                    path={`/${el}`}
                    render={(props) => (
                      <Project projectsNames={arr} {...props} path={el} projectData={projectData} userEmail={firebase.auth().currentUser.email} />
                    )}
                  />
                );
              });
              setProjectsRoutes(projRoutes);
            })
            .catch((error) => {
              showFailToast(<div className={classes.toast}>{error.message}</div>);
            });
        } else {
          props.onLogout();
          showFailToast(<div className={classes.toast}>Your email address hasn't been verified. Check your email.</div>);
        }
      } else {
        props.onLogout();
      }
    });
  }, [reloadProjectsCondition]);

  const reloadProjects = useCallback((random) => {
    setReloadProjectsCondition(random);
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact render={(props) => <Login {...props} />} />
      <Route path="/register" exact render={(props) => <Register {...props} />} />
      <Route path="/help" exact render={(props) => <Help {...props} />} />
      <Route path="/contact" exact render={(props) => <Contact {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  routes = props.isAuthenticated ? (
    <Switch>
      <ProjectsContext.Provider value={{ projectsNames: projectsNames, reloadProjects: reloadProjects }}>
        {projectsRoutes ? projectsRoutes : null}
        <Route path="/yourProjects" exact render={(props) => <YourProjects {...props} />} />
        <Route path="/help" exact render={(props) => <Help {...props} />} />
        <Route path="/contact" exact render={(props) => <Contact {...props} />} />
        <Redirect to="/yourProjects" />
      </ProjectsContext.Provider>
    </Switch>
  ) : (
    routes
  );

  return (
    <Fragment>
      <ToastContainer />
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </div>
        }
      >
        {routes}
      </Suspense>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddfireUser: (fireUser) => dispatch(actions.addFireUser(fireUser)),
    onLogout: () => dispatch(actions.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
