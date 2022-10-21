import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SinglePost from "./SinglePost";

const Posts = ({ posts }) => {
  return (
    <div>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.api.posts,
});
export default connect(mapStateToProps, {})(Posts);
