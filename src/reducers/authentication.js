import * as actionTypes from "./../actions/actionTypes";
import fire from "../fireConfig";

const initialState = {
  errMessage: null,
  loading: false,
  registered: false,
  authenticated: false,
  fireUser: null,
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR_MESSAGE:
      return {
        ...state,
        errMessage: action.errMessage,
      };
    case actionTypes.REGISTER_START:
      return {
        ...state,
        loading: true,
        errMessage: null
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        errMessage: action.error,
      };
    case actionTypes.REGISTER_END:
      return {
        ...state,
        loading: false,
        errMessage: null,
      };
    case actionTypes.SET_REGISTERED_START:
      return {
        ...state,
        registered: true,
      };
    case actionTypes.SET_REGISTERED_END:
      return {
        ...state,
        registered: false,
      };
    case actionTypes.AUTHENTICATE_START:
      return {
        ...state,
        loading: true,
        errMessage: null
      };
    case actionTypes.AUTHENTICATE_END:
      return {
        ...state,
        loading: false,
        authenticated: true,
      };
    case actionTypes.AUTHENTICATE_FAIL:
      return {
        ...state,
        loading: false,
        errMessage: action.error,
        authenticated: false,
      };
    case actionTypes.TRY_AUTO_LOGIN:
      return {
        ...state,
        authenticated: true,
      };

    case actionTypes.LOGOUT:
      fire.auth().signOut();
      localStorage.removeItem("user")
      return {
        ...state,
        authenticated: false,
      };
    case actionTypes.ADD_FIRE_USER:
      return {
        ...state,
        fireUser: action.fireUser,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authenticationReducer;
