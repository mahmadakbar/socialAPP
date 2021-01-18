import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirect: false,
      loading: false,
    };
  }

  handleChange = (name) => (e) => this.setState({ [name]: e.target.value });

  clickSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = { email, password };
    this.setState({ loading: true });
    signin(user).then((res) => {
      if (res.err) this.setState({ error: res.err, loading: false });
      else {
        //authenticate
        //redirect
        authenticate(res, () => {
          this.setState({ redirect: true, loading: false });
        });
      }
    });
  };

  signInForm = (email, password) => (
    <form>
      <div className="form-group border border-secondary formstyle">
        <input
          onChange={this.handleChange("email")}
          value={email}
          type="email"
          className="fillstyle"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon"
        />
      </div>

      <div className="form-group border border-secondary formstyle">
        <input
          onChange={this.handleChange("password")}
          value={password}
          type="password"
          className="fillstyle"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon"
        />
      </div>

      <button onClick={this.clickSubmit} className="btn btn-raised btnLogin">
        Login
      </button>
    </form>
  );

  render() {
    const { loading, email, password, error, redirect } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <div>
        <div className="container containerSignin">
          <h2 className="mt-5 mb-5">Login</h2>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
          {loading ? (
            <div className="loading">
              <a className="loading-txt">Loading...</a>
            </div>
          ) : (
            ""
          )}

          {this.signInForm(email, password)}
        </div>
        <div className="animated">
          <img src="https://iili.io/Kpiw67.gif" alt="login" />
          <a className="fontanim">Welcome back!, We always waiting to hear from you ..</a>
        </div>
      </div>
    );
  }
}

export default Signin;
