import React from "react";
import UserList from "../components/UserList/UserList";

function Users(props) {
  return (
    <div>
      <p className="fs-4">User List</p>
      <UserList />
    </div>
  );
}

export default Users;
