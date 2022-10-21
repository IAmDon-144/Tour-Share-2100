import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { loadMyProfile } from "../actions/api";
import TitleImage from '../containers/images/TitleImage.png'

const Navbar = ({ logout, user, myprofile, loadMyProfile }) => {
  useEffect(() => {
    loadMyProfile();
  }, []);

  const authLinks = () => (
    <Fragment>
      <li class="nav-item">
        <Link class="nav-link" to="/my/profile">
          Profile
        </Link>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          href={`http://127.0.0.1:8000/create-post/${
            myprofile?.userdata.id
          }/${localStorage.getItem("access")}/`}
        >
          Create
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/" onClick={logout}>
          Logout
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = () => (
    <Fragment>
      <li class="nav-item">
        <Link class="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
          <img src ={TitleImage} alt=""  height={"40px"}/>
          </Link>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {user ? authLinks() : guestLinks()}
              <li class="nav-item">
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br />
      <br />

    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  myprofile: state.api.myprofile,
});

export default connect(mapStateToProps, { logout, loadMyProfile })(Navbar);


