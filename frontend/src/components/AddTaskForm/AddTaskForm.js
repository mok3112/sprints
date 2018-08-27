/**
 * @author koml12
 * Created: 8/27/18
 */


import React, { Component } from 'react';

import axios from "axios";

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      taskMinutes: '',
      added: false
    }

    this.onAddTask = this.onAddTask.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
  }

  /**
   * Adds the given task to the list.
   * @param {EventTarget} event 
   */
  onAddTask(event) {
    event.preventDefault();

    if (this.state.taskName === "" || this.state.taskMinutes === "") {
      return;
    }

    const task = {
      name: this.state.taskName,
      time: this.state.taskMinutes,
      completed: false
    };
    console.log(task);

    axios({
      method: "post",
      url: "http://localhost:8000/sprints/api/tasks/",
      headers: {
        Authorization: "Token " + this.props.token
      },
      data: task
    })
      .then(response => this.props.onTaskAdded(response.data))
      .then(() => {
        this.setState({ taskName: "", taskMinutes: "" });
      });


  }

  onNameChange(event) {
    this.setState({ taskName: event.target.value });
  }

  onTimeChange(event) {
    this.setState({ taskMinutes: event.target.value });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onAddTask}>
          <span>
            <input type="text" name="name" value={this.state.taskName} onChange={this.onNameChange} />
          </span>
          <span>
            <input type="number" name="time" value={this.state.taskMinutes} onChange={this.onTimeChange} />
          </span>
          <span>
            <button type="submit">Add Task</button>
          </span>
        </form>
      </div>
    )
  }
}

export default AddTaskForm;