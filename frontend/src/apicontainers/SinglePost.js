import axios from "axios";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loadMyProfile, likeUnlike } from "../actions/api";

const SinglePost = ({ post, myprofile, likeUnlike }) => {
  const [len, setlen] = useState(null);
  const [liked, setLiked] = useState("Like");
  const [likeLen, setLikeLen] = useState(post?.liked.length);

  const singlePostCommentLen = async (id) => {
    const res = await axios.get(`http://127.0.0.1:8000/get-comments/${id}/`);

    setlen(res.data.length);
  };

  const likeChecked = () => {
    if (myprofile) {
      if (post.liked.includes(myprofile.userdata.id)) {
        setLiked("Unlike");
      }
    }
  };
  useEffect(() => {
    loadMyProfile();
    singlePostCommentLen(post.id);
    likeChecked();
  }, []);

  const handleLikeUnlike = (val) => {
    if (localStorage.getItem("access")) {
      if (val === "Like") {
        var totalLikes = likeLen;
        totalLikes += 1;
        setLikeLen(totalLikes);
        setLiked("Unlike");
      }
      if (val === "Unlike") {
        var totalLikes = likeLen;
        totalLikes -= 1;
        setLikeLen(totalLikes);
        setLiked("Like");
      }
      likeUnlike(post.id, myprofile.userdata.id, val);
    } else {
      <Redirect to="/login" />;
    }
  };

  const costConverter = (cost) => {
    if (cost > 1000) {
      return cost / 1000 + "k";
    } else {
      return cost;
    }
  };
  return (
    <div className="container" style={{ width: "880px" }}>
      <br />
      <div className="card" style={{ borderRadius: "8px" }}>
        <div className="card-body">
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
          <Link
            class="article-title"
            to={`/${post.id}/${post.title.replaceAll(" ", "-")}`}
          >
            <span>
              <h4> {post.title}</h4>
            </span>
          </Link>
          <h5>
            By{" "}
            <Link to={`/profile/${post.user.id}`}>
              {post.user.user.username}
            </Link>
          </h5>
          <hr />

          <div className="row">
            <div className="col-sm-7">
              <img
                class="card-img"
                style={{ height: "500px" }}
                src={`http://127.0.0.1:8000${post.image}`}
                alt="Card image cap"
              />
            </div>
            <div className="col-sm-5">
              <p class="text-justify">{post.content.slice(0, 900)}........</p>
            </div>
          </div>
          <hr />
          <br />

          <button
            type="button"
            class="btn btn-primary"
            onClick={(e) => handleLikeUnlike(liked)}
          >
            {liked}
          </button>

          <button type="text" class="btn btn-outline-danger">
            {likeLen}
          </button>

          <button type="text" class="btn btn-outline-secondary mx-1">
            Commnet {len}
          </button>
          <button type="text" class="btn btn-outline-info mx-1">
            Stayed {post.days_stayed}
          </button>
          <button type="text" class="btn btn-outline-info mx-1">
            Travellers {post.total_travellers}
          </button>
          <button type="text" class="btn btn-outline-info mx-1">
            Cost {costConverter(post.total_costs)}
          </button>
          <button type="text" class="btn btn-outline-info mx-1">
            Rating {post.rating}
          </button>
          <Link to={`/${post.id}/${post.title.replaceAll(" ", "-")}`}>
            <button type="button" class="btn btn-primary">
              More Information
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  comments: state.api.comments,
  myprofile: state.api.profile,
});
export default connect(mapStateToProps, { loadMyProfile, likeUnlike })(
  SinglePost
);

/*Freestyle Script */
