import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";
import { loadMyProfile } from "../actions/api";

const MyProfile = ({ profile, loadMyProfile }) => {

  useEffect(() => {
      loadMyProfile()

  }, []);

  return (
    <>
      <br />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="title">
              {profile ? (
                <>
                  <img
                    class="rounded-circle article-img mx-auto d-block"
                    style={{
                      height: "150px",
                      width: "150px",
                      marginBottom: "10px",
                    }}
                    src={`http://127.0.0.1:8000${profile.userdata.avatar}`}
                  />
                  <h3 className="text-center">
                    {profile.userdata.user.username}
                  </h3>
                  <hr />
                  <h5>First Name :{profile.userdata.first_name}</h5>
                  <h5>Last Name :{profile.userdata.last_name}</h5>

                  <h5>Primary Email :{profile.userdata.user.email}</h5>
                  <p>Joined :{Date(profile.userdata.created)}</p>
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.api.profile,
});

export default connect(mapStateToProps, { loadMyProfile })(MyProfile);
