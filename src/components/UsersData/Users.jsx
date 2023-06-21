import React, { useState, useEffect } from "react";
import { UserData } from "./UserData";

// ***** Getting Data From the Local Storage *****
const getDataFromLocalStorage = () => {
  const data = localStorage.getItem("users");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
const Users = () => {
  // ***** main array -> Users Data Stored in this array *****
  const [users, setUsers] = useState(getDataFromLocalStorage());

  // input fields states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");

  // ***** state for toggle data between addition and updation *****
  const [toggleSubmit, setToggleSubmit] = useState(false);

  // ***** state for edit user data *****
  const [editUser, setEditUser] = useState(null);

  // ***** this function handle the submition of data into the local storage *****
  const handleAddUserSubmit = (e) => {
    e.preventDefault();

    // ***** object for store user data *****
    let user = {
      name,
      email,
      phone,
      id,
    };

    // ***** Validation check for invalid phone Numbers *****
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    // ***** Validation conditions for user data *****
    if (user.name === "" || user.email === "" || user.phone === "") {
      alert("Please Fill the details");
    } else if (!user.phone.match(phoneno)) {
      // phone number validation
      return alert("Invalid Phone Number!");
    } else if (user && toggleSubmit) {
      // user details updation
      setUsers(
        users.map((elem) => {
          if (elem.id === editUser) {
            return { ...elem, ...user };
          }
          return elem;
        })
      );
      setToggleSubmit(false);
      setEditUser(null);

      // ***** Making form fields empty *****
      setId("");
      setName("");
      setEmail("");
      setPhone("");
    } else {
      // ***** Validation for same email and phone number *****
      let userEmail = users.find((elem) => elem.email === user.email);
      let userPhone = users.find((elem) => elem.phone === user.phone);

      if (userEmail) {
        return alert("Email address already exist!");
      } else if (userPhone) {
        return alert("Phone Number already exist!");
      }

      // ***** Storing data in users array (main array) *****
      setUsers([...users, user]);

      // ***** Making form fields empty *****
      setId("");
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  // ***** function -> for deleting the user from the list *****
  const deleteUser = (id) => {
    const filteredUsers = users.filter((element, index) => {
      return element.id !== id;
    });
    setUsers(filteredUsers);
  };

  // ***** function -> for edit the user details in the list *****
  const editUserDetails = (id) => {
    let newEditUser = users.find((user) => user.id === id);

    setToggleSubmit(true);
    setName(newEditUser.name);
    setEmail(newEditUser.email);
    setPhone(newEditUser.phone);
    setId(newEditUser.id);
    setEditUser(id);
  };

  //saving data to local storage

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <>
      <div
        className="modal fade"
        id="addNewUser"
        tabIndex="-1"
        aria-labelledby="addNewUserLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              {toggleSubmit ? (
                <h1 className="modal-title fs-5" id="eaddNewUserLabel">
                  Update Details
                </h1>
              ) : (
                <h1 className="modal-title fs-5" id="eaddNewUserLabel">
                  Add New User
                </h1>
              )}

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddUserSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phoneNo"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </div>
                <div className="d-flex justify-content-end gap-3 px-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  {toggleSubmit ? (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        setId(Math.floor(Math.random() * 100000 + 1));
                      }}
                    >
                      Add User
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column vh-100">
        <div className="table-responsive w-80 px-5 pt-5 pb-3">
          <table className="table table-striped">
            <thead>
              <tr className=" fs-5">
                <th className="text-primary px-5">Id</th>
                <th className="text-primary px-5">Name</th>
                <th className="text-primary px-5">Email</th>
                <th className="text-primary px-5">Phone Number</th>
                <th colSpan={2} className="px-5 text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            {users.length > 0 && (
              <tbody className="">
                <UserData
                  users={users}
                  deleteUser={deleteUser}
                  editUserDetails={editUserDetails}
                />
              </tbody>
            )}
          </table>
        </div>
        {users.length < 1 && (
          <div className="text-center text-danger fs-2 fw-bold">
            No User added yet !
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
