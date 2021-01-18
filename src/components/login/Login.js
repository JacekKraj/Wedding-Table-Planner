import React, { Fragment } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { NavLink } from "react-router-dom";

import LogoBar from "./../logoBar/LogoBar";
import classes from "./login.module.scss";
import Input from "./../UI/input/Input";
import MyFormikInput from "./../../utility/myFormikInput/MyFormikInput";
import Button from "./../UI/button/Button";
import * as actions from "./../../actions/index";
import Spinner from "./../UI/spinner/Spinner";
import { showFailToast } from "./../../utility/Toasts/toasts";

const Login = (props) => {
  let content = (
    <div>
      <LogoBar />
      <div className={classes.container}>
        <div className={classes.login}>
          <h1 className={classes.sectionName}>Sign In</h1>
          <div className={classes.form}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                props.onAuthenticate({
                  email: values.email,
                  password: values.password,
                });
              }}
              validationSchema={Yup.object({
                email: Yup.string().email("Email you passed seems to be invalid."),
                password: Yup.string().min(4, "Password needs to be at least 4 characters.").max(10, "Password needs to be at max 10 characters."),
              })}
            >
              {() => {
                return (
                  <Form className={classes.formContainer}>
                    <MyFormikInput name="email" type="email" label="Email:" as={Input} />

                    <MyFormikInput name="password" type="password" label="Password:" as={Input} />

                    <Button type="submit" className={classes.button}>
                      <span className={classes.buttonText}>Sign In</span>
                      <i class="fas fa-angle-right"></i>
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
        <div className={classes.register}>
          <h1 className={classes.sectionName}>Sign Up</h1>
          <p className={classes.registerDesc}>Don't have account yet? Join us and set up your projects for free just now!</p>
          <NavLink to="/register" className={classes.anchor}>
            <Button type="submit" className={classes.button}>
              <span className={classes.buttonText}>Sign Up</span>
              <i class="fas fa-angle-right"></i>
            </Button>
          </NavLink>
        </div>
      </div>
      <div className={classes.copy}>&copy;Jacek Krajewski 2020</div>
    </div>
  );

  content = props.idLoading ? (
    <div className={classes.spinner}>
      <Spinner />
    </div>
  ) : (
    content
  );

  return (
    <Fragment>
      {content}
      {props.errMessage ? showFailToast(<div className={classes.toast}>{props.errMessage}</div>) : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    errMessage: state.auth.errMessage,
    isLoading: state.auth.loading,
    fireUser: state.auth.fireUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticate: (personalData) => dispatch(actions.authenticate(personalData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
