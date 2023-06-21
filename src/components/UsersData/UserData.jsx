import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

export const UserData = ({ users, deleteUser, editUserDetails }) => {
  return users.map((user) => (
    <tr key={user.id}>
      <td className="px-5">{user.id}</td>
      <td className="px-5">{user.name}</td>
      <td className="px-5">{user.email}</td>
      <td className="px-5">{user.phone}</td>

      <td
        className="px-1 "
        onClick={() => editUserDetails(user.id)}
        data-bs-toggle="modal"
        data-bs-target="#addNewUser"
      >
        <FiEdit className="text-info" />
      </td>
      <td
        className="px-1 "
        onClick={() => {
          if (window.confirm("Are you sure you want to delete")) {
            deleteUser(user.id);
          }
        }}
      >
        <RiDeleteBin5Fill className="text-danger fs-5 cursor-pointer" />
      </td>
    </tr>
  ));
};
