import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HashLink as Link } from "react-router-hash-link";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-4">
        <div className="add_new_user_btn d-md-none">
          <button
            className="bg-primary px-3 py-2 rounded text-white fw-bold border-0"
            data-bs-toggle="modal"
            data-bs-target="#addNewUser"
          >
            <AiOutlinePlus />
            Add New User
          </button>
        </div>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-2 fw-bold text-secondary">
            Admin Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse ps-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active fs-5"
                  aria-current="page"
                >
                  <span>Home</span>
                </Link>
              </li>
            </ul>
            <button
              className="bg-primary px-3 py-2 rounded text-white fw-bold border-0 d-md-block d-none"
              data-bs-toggle="modal"
              data-bs-target="#addNewUser"
            >
              <AiOutlinePlus />
              Add New User
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
