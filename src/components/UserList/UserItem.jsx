import classes from "./UserItem.module.css";

import React, { useState } from "react";
import useHttp from "../../hooks/useHttp";
import ConfirmModal from "../Modal/ConfirmModal";

function UserItem(props) {
  const user = props.user;
  const { sendRequest } = useHttp();
  const [showModal, setShowModal] = useState(false);

  const hideModalHandler = () => {
    setShowModal(false);
  };
  
  const deleteUserHandler = () => {

  };

  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.email}</td>
      <td>{user.fullName}</td>
      <td>{user.phone}</td>
      <td>{user.address}</td>
      <td>{user.role}</td>
      <td>
        <button className="btn btn-outline-danger" onClick={deleteUserHandler}>
          Delete
        </button>
      </td>
      {showModal && (
        <ConfirmModal
          message={
            <>
              <p>Are you sure to delete this User account?</p>
              <p>You can be logged out if it is yours!</p>
            </>
          }
          handler={deleteUserHandler}
          onClose={hideModalHandler}
        />
      )}
    </tr>
  );
}

export default UserItem;
