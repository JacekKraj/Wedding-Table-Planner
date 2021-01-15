import * as actionTypes from "./actionTypes";
import fire from "../fireConfig";
import firebase from "firebase";

export const setErrorMessage = (errMessage) => {
  return {
    type: actionTypes.SET_ERROR_MESSAGE,
    errMessage: errMessage,
  };
};

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};

export const registerFail = (error) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error,
  };
};

export const registerEnd = () => {
  return {
    type: actionTypes.REGISTER_END,
  };
};

export const setRegisteredStart = () => {
  return {
    type: actionTypes.SET_REGISTERED_START,
  };
};

export const setRegisteredEnd = () => {
  return {
    type: actionTypes.SET_REGISTERED_END,
  };
};
export const register = (personalData) => {
  return (dispatch) => {
    dispatch(registerStart());
    fire
      .auth()
      .createUserWithEmailAndPassword(personalData.email, personalData.password)
      .then((response) => {
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then((response) => {
            dispatch(registerEnd());
            dispatch(setRegisteredStart());
            alert("Verification email has been sent to your adress.");
            dispatch(setRegisteredEnd());
          })
          .catch((error) => {
            dispatch(registerFail(error.message));
          });
      })
      .catch((error) => {
        dispatch(registerFail(error.message));
      });
  };
};

export const authenticateStart = () => {
  return {
    type: actionTypes.AUTHENTICATE_START,
  };
};

export const authenticateEnd = () => {
  return {
    type: actionTypes.AUTHENTICATE_END,
  };
};

export const authenticateFail = (error) => {
  return {
    type: actionTypes.AUTHENTICATE_FAIL,
    error: error,
  };
};

export const authenticate = (personalData) => {
  return (dispatch) => {
    dispatch(authenticateStart());
    fire
      .auth()
      .signInWithEmailAndPassword(personalData.email, personalData.password)
      .then((response) => {
        dispatch(authenticateEnd());
      })
      .catch((error) => {
        dispatch(authenticateFail(error.message));
      });
  };
};

export const tryAutoLogin = () => {
  return {
    type: actionTypes.TRY_AUTO_LOGIN,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const addFireUser = (fireUser) => {
  return {
    type: actionTypes.ADD_FIRE_USER,
    fireUser: fireUser,
  };
};
