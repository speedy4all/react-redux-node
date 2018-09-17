import React from "react";
import UserInfo from "../UserPrefs/UserInfo";
import logo from "../logo.svg";
import "./Header.css";
import { Header } from "react-mdl";

const CustomHeader = props => {
  return (
    <Header title="Title">
      <img className="Logo" src={logo} alt="Logo" />
      <UserInfo
        isLoggedIn={props.isLoggedIn}
        buttonHandler={props.buttonHandler}
      />
    </Header>
  );
};

export default CustomHeader;
