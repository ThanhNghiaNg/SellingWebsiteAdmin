import React from "react";
import { addStyleCurrency, orderDetailBaseUrl } from "../../utils/global";
import { Link } from "react-router-dom";

function OrderItem({ item }) {
  return (
    <tr>
      <td>{item.user.userId}</td>
      <td>{item.user.fullName}</td>
      <td>{item.user.phone}</td>
      <td>{item.user.address}</td>
      <td>{addStyleCurrency(item.totalPrice)} </td>
      <td>{item.delivery}</td>
      <td>{item.status}</td>
      <td>
        <Link
          className="btn btn-success"
          to={`${orderDetailBaseUrl}/${item._id}`}
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default OrderItem;
