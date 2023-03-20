import classes from "./LiveChat.module.css";

import React from "react";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import { serverUrl } from "../../utils/global";
import RoomList from "./RoomList";
import Room from "./Room";
import openSocket from "socket.io-client";

function LiveChat(props) {
  const { sendRequest } = useHttp();
  const [data, setData] = useState([]);

  useEffect(() => {
    sendRequest({ url: `${serverUrl}/admin/rooms` }, (data) => {
      setData(data);
      const socket = openSocket(`${serverUrl}`);
      socket.on("onRoom", (data) => {
        if (data.action === "new") {
          setData((prev) => {
            return [data.id, ...prev];
          });
        }
      });
    });
  }, []);

  return (
    <div className={classes.livechat}>
      <RoomList data={data} />
      <Room />
    </div>
  );
}

export default LiveChat;
