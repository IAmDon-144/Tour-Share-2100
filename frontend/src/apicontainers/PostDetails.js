import React, { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadSingleData,
  loadComments,
  createComment,
  loadMyProfile,
} from "../actions/api";

const PostDetails = ({
  loadMyProfile,
  loadSingleData,
  loadComments,
  post,
  comments,
  createComment,
  profile,
  setProgress,
  setColor,
}) => {
  const { id } = useParams();

  const [body, setBody] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(
    localStorage.getItem("access")
  );

  const handleCreateComment = () => {
    if(body === ""){return}
    if (isAuthenticated) {
      createComment(id, profile.userdata.id, body);
      setBody("");
    } else {
      <Redirect to="/login" />;
    }
  };

  useEffect(() => {
    loadSingleData(id);
    setColor("#8d0fe4");
    setProgress(50);
    loadComments(id);
    loadMyProfile();
    setColor("#7ee40f");
    setProgress(100);
  }, []);

  const convertDate = (date) => {
    const newDate = new Date(date);
    const onlyDate = newDate.toUTCString();
    return onlyDate.slice(0, 16);
  };
  setColor("#0f5ae4");
  setProgress(20);

  const diffTime = (date) => {
    const currentDate = new Date().getDate();
    const newDate = new Date(date).getDate();
    let difference = currentDate - newDate;

    if (difference < 0) {
      difference = difference + 30;
      return difference;
    } else {
      return difference;
    }
  };
  setProgress(0);

  return (
    <div className="container" style={{ width: "1050px" }}>
      <br />
      {post ? (
        <>
          <img
            class="rounded-circle article-img"
            style={{
              height: "65px",
              width: "65px",
              float: "left",
              marginRight: "10px",
            }}
            src={`http://127.0.0.1:8000${post.user.avatar}`}
          />
          <h2 className="title">
            {post.title} by{" "}
            <Link to={`/profile/${post.user.id}`}>
              {post.user.user.username}
            </Link>
          </h2>
          <p>{convertDate(post.created)}</p>
          <hr />
          <div className="row">
            <div className="col-sm-7">
              <div className="card ">
                <div className="card-body">
                  <img
                    class="card-img"
                    style={{ height: "605px" }}
                    src={`http://127.0.0.1:8000${post.image}`}
                    alt="Card image cap"
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="card">
                <div className="card-body">
                  <table class="table table-hover table-striped table-bordered ">
                    <tbody>
                      <tr>
                        <td>Author</td>
                        <td>{post.user.user.username}</td>
                      </tr>
                      <tr>
                        <td>Posted</td>
                        <td>
                          {diffTime(post.created)}{" "}
                          {diffTime(post.created) <= 1 ? (
                            <>Day Ago</>
                          ) : (
                            <>Days Ago</>
                          )}{" "}
                        </td>
                      </tr>
                      <tr>
                        <td>Day Stayed</td>
                        <td>{post.days_stayed} Days</td>
                      </tr>
                      {post.hotel_name ? (
                        <tr>
                          <td>Hotel Name</td>
                          <td>{post.hotel_name}</td>
                        </tr>
                      ) : (
                        <></>
                      )}

                      <tr>
                        <td>Total Travellers</td>
                        <td>{post.total_travellers}</td>
                      </tr>
                      <tr>
                        <td>Total Cost</td>
                        <td>{post.total_costs} Taka</td>
                      </tr>
                      <tr>
                        <td>Per Person Cost</td>
                        <td>
                          {parseInt(post.total_costs / post.total_travellers)}{" "}
                          Taka Almost
                        </td>
                      </tr>
                      <tr>
                        <td>Author's Rating</td>
                        <td>{post.rating}/10</td>
                      </tr>
                      <tr>
                        <td>Food Quality</td>
                        <td>{post.food_experience}</td>
                      </tr>
                      <tr>
                        <td>Local's Behavior</td>
                        <td>{post.locals_behavior}</td>
                      </tr>
                      <tr>
                        <td>Worth</td>
                        <td>
                          <div className="progress">
                            <div
                              className={`progress-bar ${
                                post.worth > 50 ? "bg-success" : ""
                              }`}
                              role="progressbar"
                              aria-valuenow="70"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: `${post.worth}%` }}
                            >
                              {post.worth}%
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Riskness</td>
                        <td>
                          <div className="progress">
                            <div
                              className={`progress-bar ${
                                post.riskiness > 50 ? "bg-danger" : ""
                              }`}
                              role="progressbar"
                              aria-valuenow="70"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: `${post.riskiness}%` }}
                            >
                              {post.riskiness}%
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="card">
            <div className="card-body">
              <p className="text-justify">{post.content}</p>
            </div>
          </div>
          <button type="button" class="btn btn-info mt-2">
            Hit it As Usefull Post
          </button>
          <button type="text" class="btn btn-outline-primary mt-2">
            {post.liked.length}
          </button>
          {post?.author === profile?.userdata.id ? (
            <>
              <Link to={`/update/${post.id}/post`}>
                <button type="button" class="btn btn-secondary mt-2 mx-2">
                  Update
                </button>
              </Link>

              <Link to={`/delete/${post.id}/post`}>
                <button type="button" class="btn btn-danger mt-2">
                  Delete
                </button>
              </Link>
            </>
          ) : (
            <></>
          )}

          <div class="input-group input-group-lg mt-2">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-lg">
                Add A Comment
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              name="body"
              value={body}

              onChange={(e) => setBody(e.target.value)}
            />
            <button
              disabled={!isAuthenticated}
              onClick={handleCreateComment}
              className="btn btn-primary"
            >
              Comment
            </button>
            <br />
          </div>
          {!isAuthenticated ? (
            <>
              <p>Please Login for do a Comment </p>
            </>
          ) : (
            <></>
          )}

          {comments.length === 0 ? (
            <>
              <h1 className="mt-2">Comments({comments.length})</h1>
              <p className="mt-2">Be the First One to Do a Comment</p>
            </>
          ) : (
            <>
              <h1 className="mt-2">Comments({comments.length})</h1>
            </>
          )}

          <br />
          {comments !== null ? (
            <>
              {comments.map((comment, i) => (
                <div className="container">
                  <div className="card">
                    <div className="body">
                      <img
                        class="rounded-circle article-img"
                        style={{
                          height: "40px",
                          width: "40px",
                          float: "left",
                          margin: "5px",
                        }}
                        src={`http://127.0.0.1:8000${comment.user.avatar}`}
                      />
                      <span>
                        <h5 style={{ marginTop: "10px" }}>
                          {comment.user.user.username} said{" "}
                          <span style={{ color: "blue" }}>"{comment.body}"</span>{" "}
                          at {convertDate(comment.created)}{" "}
                        </h5>
                      </span>
                    </div>
                  </div>
                  <br />
                </div>
              ))}
            </>
          ) : (
            <>
              <h1>Loading....</h1>
            </>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.api.post,
  comments: state.api.comments,
  profile: state.api.profile,
});
export default connect(mapStateToProps, {
  loadSingleData,
  loadComments,
  createComment,
  loadMyProfile,
})(PostDetails);
