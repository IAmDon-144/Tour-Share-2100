import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setrequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    reset_password(email);
    setrequestSent(true);
  };
  if (requestSent) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mt-5">
      <h1>Reset Your Password</h1>
      <hr/>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <button className="btn btn-primary mt-2" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
