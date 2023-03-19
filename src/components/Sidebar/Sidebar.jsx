import classes from "./Sidebar.module.css";
import React from "react";
import { Link, useMatch } from "react-router-dom";
import useHttp from "../../hooks/useHttp";
import { useDispatch } from "react-redux";
import { serverUrl } from "../../utils/global";
import { authActions } from "../../store/authSlice";
import { useSelector } from "react-redux";

function Sidebar(props) {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const logoutHandler = () => {
    sendRequest({ url: `${serverUrl}/logout`, method: "POST" }, (data) => {
      dispatch(authActions.logout());
    });
  };
  const adminNavigation = (
    <>
      <li className={useMatch("/") && classes.active}>
        <Link to="/">DashBoard</Link>
      </li>
      <li className={useMatch("/products") && classes.active}>
        <Link to="/products">Products</Link>
      </li>
      <li className={useMatch("/users") && classes.active}>
        <Link to="/users">Users</Link>
      </li>
      <li className={useMatch("/create-product") && classes.active}>
        <Link to="/create-product">New Product</Link>
      </li>
    </>
  );
  return (
    <div className={classes.sidebar}>
      <div className={classes.role}>{role}</div>
      <ul className={classes.navigation}>
        {role === "admin" && adminNavigation}
        <li className={useMatch("/chat") && classes.active}>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <button className="btn btn-outline-danger" onClick={logoutHandler}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
