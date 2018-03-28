/**
 * @author mok3112
 * Created: 3/22/18
 */

import React, { Component } from "react";
import axios from "axios";

/**
 * Form Component that has fields for the user's username and password.
 * When the "Log in" button is clicked, sends a POST request to the DB,
 * and gets the response.
 * If the response from the request is of the form {token: "xxx"}, then the
 * user's credentials could be found, and they were successfully logged in.
 */
// TODO: after checking if user is logged in, render the task list then instead
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        console.log(this.state.username);
        console.log(this.state.password);
        axios({
            method: "post",
            url: "http://localhost:8000/sprints/api/get_auth_token/",
            data: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(response => {
            if (response.hasOwnProperty("token")) {
                console.log("Login success");
            } else {
                console.log("Login failure");
            }
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleUsernameChange} placeholder="Username"/>
                    <input type="password" onChange={this.handlePasswordChange} placeholder="Password"/>
                    <input type="submit" value="Log in"/>
                </form>
            </div>
        )
    }
}

export default LoginForm;