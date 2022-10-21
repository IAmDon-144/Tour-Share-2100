import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";

const Activate = ({ verify, match }) => {
  const [veirfied, setVeirfied] = useState(false);

  const verifyAccount = (e) => {
    const uid = match.params.uid;
    const token = match.params.token;
    e.preventDefault();

    verify(uid, token);
    setVeirfied(true);
  };

  if (veirfied) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div
        className="d-flex flex-column justify-content align-items-center"
        style={{ marginTop: "200px" }}
      >
        <h1>Verify Your Account:</h1>
        <button
          onClick={verifyAccount}
          style={{ marginTop: "50px" }}
          className="btn btn-primary"
          type="button"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default connect(null, { verify })(Activate);
