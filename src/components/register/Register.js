import React, { useState, Fragment } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import Input from "./../UI/input/Input";
import MyFormikInput from "./../../utility/myFormikInput/MyFormikInput";
import Button from "./../UI/button/Button";
import LogoBar from "./../logoBar/LogoBar";
import classes from "./register.module.scss";
import ErrorBox from "./../UI/errorBox/ErrorBox";
import * as actions from "./../../actions/index";
import Spinner from "./../UI/spinner/Spinner";
import MyFormikCheckbox from "./../../utility/myFormikCheckbox/MyFormikCheckbox";
import { showFailToast } from "./../../utility/Toasts/toasts";

const Register = (props) => {
  const [error, setError] = useState(null);
  let content = (
    <div>
      <ErrorBox className={classnames(classes.errorBox, error && classes.errorVisible)}>{error}</ErrorBox>
      <LogoBar />
      <div className={classes.container}>
        <h1 className={classes.sectionName}>Sign In</h1>
        <Formik
          initialValues={{
            email: "",
            repeatEmail: "",
            password: "",
            repeatPassword: "",
            terms: false,
          }}
          onSubmit={(values) => {
            setError(null);
            if (values.email === values.repeatEmail) {
              if (values.password === values.repeatPassword) {
                if (values.terms) {
                  const personalData = {
                    email: values.email,
                    password: values.password,
                  };
                  props.onRegister(personalData);
                } else {
                  setError("You need to accept terms to create account.");
                }
              } else {
                setError("Passwords you passed are not equal.");
              }
            } else {
              setError("Emails you passed are not equal.");
            }
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Email you passed seems to be invalid."),
            repeatEmail: Yup.string().email("Email you passed seems to be invalid."),
            password: Yup.string().min(4, "Password needs to be at least 4 characters.").max(10, "Password needs to be at max 10 characters."),
            repeatPassword: Yup.string().min(4, "Password needs to be at least 4 characters.").max(10, "Password needs to be at max 10 characters."),
          })}
        >
          {() => {
            return (
              <Form className={classes.formContainer}>
                <div className={classes.register}>
                  <MyFormikInput name="email" type="email" label="Email:" as={Input} />
                  <MyFormikInput name="repeatEmail" type="email" label="Repeat email:" as={Input} />
                  <MyFormikInput name="password" type="password" label="Password:" as={Input} />
                  <MyFormikInput name="repeatPassword" type="password" label="Repeat Password:" as={Input} />
                </div>
                <div className={classes.rightSide}>
                  <div className={classes.acceptTerms}>
                    <MyFormikCheckbox
                      name="terms"
                      text="I declare that I got known to all terms in Wedding S.A.
                      statue and I accept all the rules."
                    />
                  </div>
                  <Button type="submit" className={classes.button}>
                    <span className={classes.buttonText}>Sign Up</span>
                    <i class="fas fa-angle-right"></i>
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className={classes.copy}>&copy;Jacek Krajewski 2020</div>
    </div>
  );

  content = props.isLoading ? (
    <div className={classes.spinner}>
      <Spinner />
    </div>
  ) : (
    content
  );

  content = props.isRegistered ? (
    <div>
      <Redirect to="/" />
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
    isLoading: state.auth.loading,
    isRegistered: state.auth.registered,
    errMessage: state.auth.errMessage,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    onRegister: (personalData) => dispatch(actions.register(personalData)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Register);
