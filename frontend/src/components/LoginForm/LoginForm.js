import React, { Component } from 'react'

import "./index.css";

import axios from "axios";

import TaskList from "../TaskList";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
      loggedIn: false
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onLogin(event) {
    event.preventDefault();

    const login = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post('http://localhost:8000/sprints/api/get_auth_token/',
      login)
      .then(res => {
        console.log(res.data);
        if (res.data.hasOwnProperty("token")) {
          console.log("logged in!");
          this.setState({ token: res.data.token, loggedIn: true });
        }
      });
  }

  render() {
    return (
      !this.state.loggedIn ? (
        <div className="LoginForm">
          <form onSubmit={this.onLogin}>
            <input type="text" name="username" onChange={this.onUsernameChange} />
            <br />
            <input type="password" name="password" onChange={this.onPasswordChange} />
            <br />
            <button type="submit">Log In</button>

          </form>
        </div>
      ) : <TaskList token={this.state.token} />
    );
  }
}

export default LoginForm;