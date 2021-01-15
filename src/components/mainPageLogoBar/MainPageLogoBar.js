import React from "react";
import { connect } from "react-redux";

import * as actions from "./../../actions/index";

import classes from "./mainPageLogoBar.module.scss";

const MainPageLogoBar = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.logo}>Wedding</div>
      <div
        className={classes.logOut}
        onClick={() => {
          props.onLogout();
        }}
      >
        <i class="fas fa-sign-out-alt"></i>
        <span className={classes.text}>Log out</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(MainPageLogoBar);
