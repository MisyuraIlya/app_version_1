import React, { Component, useContext } from "react";
import UserContext from '../../UserContext';
import { NavLink, useHistory } from "react-router-dom";

const LoginButton = () => {
  const app = useContext(UserContext);
  return (
    <li>
      {app.whoIs().type === 'guest' ?
        <span onClick={() => app.changeState('login', true)}>התחבר | הרשם</span>
      : null}
      {app.whoIs().type === 'admin' ?
        <span onClick={app.exit}>אדמין | התנתק</span>
      : null}
      {app.whoIs().type === 'user' ?
        <span onClick={app.exit}>{app.whoIs().FirstName + ' | התנתק'}</span>
      : null}
    </li>
  );
}

export default LoginButton;
