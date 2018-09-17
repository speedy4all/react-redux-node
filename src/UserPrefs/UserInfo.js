import React from "react";
import "./UserInfo.css";

export default props => {
  const headerContainerClass = `FloatRight CenterHeader visible ${
    props.isLoggedIn ? "" : "hidden"
  }`;
  return (
    <div className={headerContainerClass}>
      <a className="UserContainer" href="/logout">
        User name
      </a>
      <button className="LogoutBtn" onClick={props.buttonHandler}>
        Logout
      </button>
    </div>
  );
};
