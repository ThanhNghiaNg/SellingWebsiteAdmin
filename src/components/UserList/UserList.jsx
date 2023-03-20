import classes from "./UserList.module.css";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useHttp from "../../hooks/useHttp";
import { serverUrl } from "../../utils/global";
import UserItem from "./UserItem";
import Card from "../UI/Card";
import { Pagination } from "antd";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const { sendRequest, error, isLoading } = useHttp();
  const [currentPage, setCurrentPage] = useState(1);
  const [numResult, setNumResult] = useState(0);
  const pageSize = 10;

  const onReloadHandler = () => {
    setReload((prev) => !prev);
  };

  const changePageHandler = (values) => {
    setCurrentPage(values);
  };

  useEffect(() => {
    sendRequest(
      {
        url: `${serverUrl}/admin/users?page=${currentPage}&&pageSize=${pageSize}`,
      },
      (data) => {
        console.log(data);
        setUsers(data.data);
        setNumResult(data.numResult);
      }
    );
  }, [currentPage, reload]);
  const userListContent = users.map((user) => (
    <UserItem key={user._id} user={user} onReload={onReloadHandler} />
  ));
  return (
    <Card>
      <table className={`table ${classes.table}`}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Email</td>
            <td>Full Name</td>
            <td>Phone</td>
            <td>Address</td>
            <td>Role</td>
            <td>Active</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>{userListContent}</tbody>
      </table>
      <Pagination
        defaultCurrent={1}
        total={numResult}
        pageSize={pageSize}
        onChange={changePageHandler}
        className="d-flex justify-content-end"
      />
    </Card>
  );
}

export default UserList;
