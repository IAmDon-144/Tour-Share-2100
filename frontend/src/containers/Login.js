import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

const Login = ({ login, isAuthenticated ,setProgress}) => {
  setProgress(100)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mt-5">
      <h1>Sign In</h1>

      <p>Sign in to Your Account</p>
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
        <div className="form-group mt-2">
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
        <button className="btn btn-primary mt-2" type="submit">
          Login
        </button>
      </form>
      <p className="mt-3">
        Don't Have any Account <Link to="/signup">Sign Up</Link>
      </p>
      <p className="mt-3">
        Forgot Your Password <Link to="/reset-password">Reset My Password</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
