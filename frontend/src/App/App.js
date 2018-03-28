/**
 * Top navigation bar for the website.
 * Links to navigate back to the homepage, see info about the app, log in, and sign up.
 */
import React, { Component } from "react";
import "./App.css";
import axios from "axios";

import {
    Sidebar
} from "../Sidebar/index";

import {
    TaskAdderForm
} from "../Forms/index";

import TaskList from "../TaskList/index";

import Header from "../Header/index";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            settings: {},
        };
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "http://localhost:8000/sprints/api/tasks/?format=json",
            headers: {
                Authorization: "Token 5811801c73b7a496b671a2b83b10e42b2a4dd2ed"
            }
        }).then(response => {
            const tasks = response.data;
            this.setState(tasks);
        });

        axios({
            method: "get",
            url: "http://localhost:8000/sprints/api/settings/1/?format=json",
            headers: {
                Authorization: "Token 5811801c73b7a496b671a2b83b10e42b2a4dd2ed"
            }
        }).then(response => {
            const settings = response.data;
            this.setState(settings);
        });
    }


    render() {
        return (
        <div className="big-div">
            <Header />
            <Sidebar />
            <TaskList taskList={this.state.tasks} settings={this.state.settings}/>
            <TaskAdderForm />
        </div>
    );
  }
}

export default App;
