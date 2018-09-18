import React from "react";
import UserInfo from "../UserPrefs/UserInfo";
import logo from "../logo.svg";
import "./Header.css";
import { Header, Textfield } from "react-mdl";

const CustomHeader = props => {
  const handler = props.handleSearch;
  const debounce = e => {
    e.persist();
    setTimeout(props => {
      handler(e.target.value);
    }, 400);
  };
  return (
    <Header title="Title">
      <Textfield
        onChange={debounce}
        label="Search"
        expandable
        expandableIcon="search"
      />
      <img className="Logo" src={logo} alt="Logo" />
      <UserInfo
        isLoggedIn={props.isLoggedIn}
        buttonHandler={props.buttonHandler}
      />
    </Header>
  );
};

export default CustomHeader;
