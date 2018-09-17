import React from "react";
import UserInfo from "../UserPrefs/UserInfo";
import logo from "../logo.svg";
import "./Header.css";

export default props => {
  return (
    <div className="Header">
      <img className="Logo" src={logo} alt="Logo" />
      <UserInfo
        isLoggedIn={props.isLoggedIn}
        buttonHandler={props.buttonHandler}
      />
    </div>
  );
};
