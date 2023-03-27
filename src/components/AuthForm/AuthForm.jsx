import classes from "./AuthForm.module.css";

import React from "react";
import { useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/global";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

function AuthForm(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { error, isLoading, sendRequest } = useHttp();
  const [toggleHint, setToggleHint] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (event) => {
    event.preventDefault();
    sendRequest(
      {
        url: `${serverUrl}/login`,
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          role: ["admin", "consultant"],
        }),
      },
      (data) => {
        dispatch(authActions.login({ token: data.token, role: data.role }));
        if (data.role === "admin") {
          navigate("/");
        } else {
          navigate("/chat");
        }
      }
    );
  };
  const toggleHintHandler = () => {
    setToggleHint((prev) => !prev);
  };

  return (
    <div className={classes.wrap}>
      <form className={classes.form}>
        <div className={classes["input-controls"]}>
          <label>Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(event) => {
              setemail(event.target.value);
            }}
          ></input>
        </div>
        <div className={classes["input-controls"]}>
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(event) => {
              setpassword(event.target.value);
            }}
          ></input>
        </div>
        {isLoading && (
          <div className="text-center">
            <Spin />
            <p className="text-primary">
              Please wait... It can take a few minutes.
            </p>
          </div>
        )}
        {error && <p className="text-danger text-center">{error}</p>}
        <div className={classes["actions-controls"]}>
          <button className="btn btn-outline-success" onClick={submitHandler}>
            Login
          </button>
          <button className="btn btn-outline-info" type="reset">
            Reset
          </button>
        </div>
        <div className="text-primary">
          <button
            onClick={toggleHintHandler}
            type="button"
            className="btn border"
          >
            Hint
          </button>
          {toggleHint && (
            <ul>
              <li>
                <p>
                  email: <em>"admin@gmail.com"</em>
                </p>
              </li>
              <li>
                <p>
                  password: <em>"admin"</em>
                </p>
              </li>
              <br />
              <li>
                <p>
                  email: <em>"consultant@gmail.com"</em>
                </p>
              </li>
              <li>
                <p>
                  password: <em>"consultant"</em>
                </p>
              </li>
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
