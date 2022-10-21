import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
  const [requestSent, setrequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const uid = match.params.uid;
    const token = match.params.token;
    reset_password_confirm(uid, token, new_password, re_new_password);
    setrequestSent(true);
  };
  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mt-5">
      <h1>Confirm Password Password</h1>
      <hr />

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="new_password"
            placeholder="Enter Your New Password"
            value={new_password}
            onChange={(e) => onChange(e)}
            required
          />
          <br />

          <input
            type="password"
            className="form-control"
            name="re_new_password"
            placeholder="Confirm Your New Password"
            value={re_new_password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <button className="btn btn-primary mt-2" type="submit">
          Confirm Your Password
        </button>
      </form>
    </div>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
