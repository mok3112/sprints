/**
 * @author mok3112
 * Created: 3/27/18
 */

import React, { Component } from "react";
import axios from "axios";

/**
 * Form Component that handles the adding of a task.
 * Sends a POST request to the DB and reloads the page after the user submits
 * the new task.
 */

/* TODO: this almost certainly does not work unless we have a token to send
   with the request */
class TaskAdderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            time: "",
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleTimeChange(event) {
        this.setState({time: event.target.value});
    }

    handleSubmit(event) {
        axios({
            method: "post",
            url: "http://localhost:8000/sprints/api/tasks/",
            data: {
                name: this.state.name,
                time: this.state.time,
                completed: false,
            },
            headers: "Token 5811801c73b7a496b671a2b83b10e42b2a4dd2ed"
        });
    }

    render() {

        return(
          <div className="task-adder">
              <form onSubmit={this.handleSubmit}>
                  <span>
                      <input type="text" onChange={this.handleNameChange} placeholder="Task name" />
                      <input type="number" onChange={this.handleTimeChange} placeholder="Time" />
                      <input type="submit" value="Submit" />
                  </span>
              </form>
          </div>
        );
    }
}

export default TaskAdderForm;