/**
 * @author mok3112
 * Created: 3/22/18
 */

import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import TaskList from "../TaskList/TaskList";

import "./index.css"

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
            password: "",
            token: "",
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderTaskList = this.renderTaskList.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    renderTaskList() {
        if (this.state.token !== "") {
            console.log(this.state.token);
            return (
                <TaskList token={this.state.token}/>
            );
        } else {
            return null;
        }
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
            console.log(response);
            debugger;
            if (response.data.hasOwnProperty("token")) {
                this.setState({token: response.data.token});
            }
        });
    }

    submitForm() {
        const data = {
            username: this.state.username,
            password: this.state.password
        };

        $.ajax({
            url: "http://localhost:8000/sprints/api/get_auth_token/",
            type: "POST",
            data: data,
            dataType: "json",
            success: function (result) {
                console.log(result);
                if (result.hasOwnProperty("token")) {
                    this.setState({ token: result.token });
                    alert(result.token);
                }
            }
        });
    }

    render() {
        return (
            <div className="login-form">
                <form className="login-form">
                    <span>
                        <input className="login-input" type="text" id="id_username" onChange={this.handleUsernameChange} placeholder="Username"/>
                    </span>
                    <span>
                        <input className="login-input" type="password" id="id_password" onChange={this.handlePasswordChange} placeholder="Password"/>
                    </span>
                    <span>
                        <input className="login-input" type="button" onClick={this.handleSubmit} value="Log in"/>
                    </span>
                </form>
                {this.renderTaskList()}
            </div>
        )
    }
}

export default LoginForm;