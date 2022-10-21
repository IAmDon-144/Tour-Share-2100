import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams, Redirect } from "react-router-dom";
import { loadProfile, loadProfilePost } from "../actions/api";
import SinglePost from "../apicontainers/SinglePost";

const Profile = ({ profile, loadProfile, loadProfilePost, posts }) => {
  const { id } = useParams();
  useEffect(() => {
    loadProfile(id);
    loadProfilePost(id);
  }, []);

  const convertDate = (date) => {
    const newDate = new Date(date);
    const onlyDate = newDate.toUTCString();
    return onlyDate.slice(0, 16);
  };

  return (
    <>
      <br />
      <div className="container" style={{ width: "880px" }}>
        {profile ? (
          <>
            <div className="card">
              <div className="card-body">
                <div className="title">
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
                  <p>Joined :{convertDate(profile.userdata.created)}</p>
                </div>
              </div>
            </div>
            <br />

            {posts !== null ? (
              <>
                {posts.map((data, i) => (
                  <SinglePost post={data} key={i} />
                ))}
                <br />
              </>
            ) : (
              <h1>No Post Found</h1>
            )}
          </>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.api.profile,
  posts: state.api.posts,
});

export default connect(mapStateToProps, { loadProfile, loadProfilePost })(
  Profile
);
