import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";

const Signup = ({ signup, isAuthenticated ,setProgress}) => {
  setProgress(100)
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { name, email, password, re_password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === re_password) {
      signup(name, email, password, re_password);
      setAccountCreated(true);
    }
  };
  if (accountCreated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container mt-5">
      <h1>Sign Up</h1>
      <p>Create Your Free Account</p>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter You Name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter An Email Like example@gmail.com"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group mt-2">
          <input
            type="password"
            className="form-control"
            name="re_password"
            placeholder="Re-type Your Password"
            value={re_password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Signup Now!
        </button>
      </form>
      <p className="mt-3">
        Already Have any Account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default connect(null, { signup })(Signup);
