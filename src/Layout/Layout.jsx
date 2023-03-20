import classes from "./Layout.module.css";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout(props) {
  const [showSizebar, setShowSizebar] = useState(false);
  const toggleSizebarHandler = () => {
    setShowSizebar((prev) => !prev);
  };
  return (
    <div className={classes.layout}>
      <div
        className={`${classes["layout__sidebar"]} sm-block ${
          showSizebar ? classes["float"] : ""
        }`}
      >
        <div
          className={`${classes["layout__sidebar-responsive"]} ${
            showSizebar ? classes["show"] : ""
          }`}
        >
          <Sidebar />
        </div>
        <button
          className={`mt-4 ms-1 ${classes["layout__sidebar-toggle"]}`}
          onClick={toggleSizebarHandler}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      <div className="m-4">{props.children}</div>
    </div>
  );
}

export default Layout;
