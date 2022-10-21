import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

const SideProfileBar = ({ profile, topProfiles, logout }) => {
  return (
    <>
      {profile ? (
        <>
          <div
            className="container mx-2 sidebar"
            style={{ width: "350px", position: "fixed" }}
          >
            <div className="card mt-2">
              <div className="card-body">
                <Link to={`/my/profile`}>
                  <img
                    class="rounded-circle article-img mx-2"
                    style={{
                      height: "60px",
                      width: "60px",
                    }}
                    src={`http://127.0.0.1:8000${profile?.userdata.avatar}`}
                  />
                  <span className="mx-1" style={{ fontWeight: "bold" }}>
                    {profile?.userdata.user.username}
                  </span>
                </Link>
                <br />
                <br />
                <p style={{ color: "#8f8f8f", fontWeight: "normal" }}>
                  Top Profile For You
                </p>
                {topProfiles !== null ? (
                  <>
                    {topProfiles.map((data, i) => (
                      <>
                        <hr />
                        <Link to={`/profile/${data?.id}`}>
                          <img
                            class="rounded-circle article-img mx-2"
                            style={{
                              height: "30px",
                              width: "30px",
                            }}
                            src={`http://127.0.0.1:8000${data?.avatar}`}
                          />
                          <span className="mx-1" style={{}}>
                            {data?.user.username}
                          </span>
                        </Link>
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <br />

            <div style={{ fontSize: "14px" }}>
              <Link to="/about">
                <span className="mx-1" style={{ color: "#bbbbbb" }}>
                  About
                </span>
              </Link>

              <span style={{ color: "#bbbbbb" }}>.</span>

              <Link to="/settings">
                <span className="mx-1" style={{ color: "#bbbbbb" }}>
                  Settings
                </span>
              </Link>

              <span style={{ color: "#bbbbbb" }}>.</span>

              <a href="/">
                <span
                  className="mx-1"
                  style={{ color: "#bbbbbb" }}
                  onClick={logout}
                >
                  Logout
                </span>
              </a>
              <span style={{ color: "#bbbbbb" }}>.</span>

              <Link to="/api">
                <span className="mx-1" style={{ color: "#bbbbbb" }}>
                  API
                </span>
              </Link>
            </div>

            <p style={{ color: "#bbbbbb" }}>© 2022 TOUR SHARE -CSE 2100</p>
          </div>
        </>
      ) : (
        <>
          <div
            className="container mx-2 sidebar mt-2"
            style={{ width: "350px", position: "fixed" }}
          >
            {/* <div className="card">
              <div className="card-body">
                <p>You Are Not a Resigtered User </p>
              </div>
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.api.profile,
  topProfiles: state.api.topProfiles,
});
export default connect(mapStateToProps, { logout })(SideProfileBar);
