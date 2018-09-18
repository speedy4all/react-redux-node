import React from "react";
import UserInfo from "../UserPrefs/UserInfo";
import logo from "../logo.svg";
import "./Header.css";
import { Header, Textfield } from "react-mdl";
import { debounce } from "lodash";

const CustomHeader = props => {
  const originalHandler = props.handleSearch;

  const debounceAction = debounce(e => {
    originalHandler(e.target.value);
  }, 400);

  const changeHandler = e => {
    e.persist();
    debounceAction(e);
  };
  return (
    <Header title="Title">
      <Textfield
        onChange={changeHandler}
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
