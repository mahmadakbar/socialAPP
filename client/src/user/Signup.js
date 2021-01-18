import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      success: false,
    };
  }

  handleChange = (name) => (e) =>
    this.setState({ [name]: e.target.value, error: "" });

  clickSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };
    signup(user).then((res) => {
      if (res.err) this.setState({ error: res.err });
      else {
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  signUpForm = (name, email, password) => (
    <form>
      <div className="form-group border border-secondary formstyle">
        <input
          onChange={this.handleChange("name")}
          value={name}
          type="text"
          className="fillstyle"
          placeholder="Name"
          aria-label="Name"
          aria-describedby="basic-addon"
        />
      </div>
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
      <button onClick={this.clickSubmit} className="btn btn-raised btnSignup">
        Submit
      </button>
    </form>
  );

  render() {
    const { name, email, password, error, success } = this.state;
    return (
      <div>
        <div className="container containerSiginup">
          <h2 className="mt-5 mb-5">Register</h2>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New acount is successfully created. Pls{" "}
            <Link to="/signin">Login</Link>!!!
          </div>

          {this.signUpForm(name, email, password)}
        </div>
        <div className="animated">
          <img src="https://iili.io/KpsNxR.gif" alt="Register"/>
          <a className="fontanim2">Come join with us, let's find the better community !!</a>
        </div>
      </div>
    );
  }
}

export default Signup;
