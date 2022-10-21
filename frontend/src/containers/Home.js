import { connect } from "react-redux";
import Posts from "../apicontainers/Posts";
import { loadAllData, loadTopProfile, loadMyProfile } from "../actions/api";

import React, { useEffect } from "react";

import Slider from "./Slider";
import SideProfileBar from "../apicontainers/SideProfileBar";

const Home = ({
  loadAllData,
  loadTopProfile,
  loadMyProfile,
  setProgress,
  setColor,
}) => {
  useEffect(() => {
    loadAllData();
    loadMyProfile();
    setColor("#0f5ae4");
    setProgress(70);
    loadTopProfile();
    setColor("#7ee40f");
    setProgress(100);
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-sm-9">
          <Slider />
          <Posts setProgress={setProgress} setColor={setColor} />
        </div>
        <div className="col-sm-3">
          <SideProfileBar />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  loadAllData,
  loadTopProfile,
  loadMyProfile,
})(Home);
