/**
 * @author mok3112
 * Created: 3/27/18
 */

import React, { Component } from "react";
import axios from "axios";

import "./index.css";

import StartTaskButton from "../Buttons"

/**
 * List of incomplete tasks associated with a user.
 */
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [
        {
          name: "",
          time: 0,
          completed: false
        }
      ],
      settings: {
        name: "",
        point_hour_ratio: 30,
        daily_high_score: 0,
        total_points: 0
      },
      token: props.token,
      focusedTask: null
    };
    this.shouldDisplayItem = this.shouldDisplayItem.bind(this);
    this.checkIfIncomplete = this.checkIfIncomplete.bind(this);
    //this.handleStartButtonClick = this.handleStartButtonClick.bind(this);
    this.handleTaskItemClick = this.handleTaskItemClick.bind(this);

  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:8000/sprints/api/tasks/?format=json",
      headers: {
        Authorization: `Token ${this.state.token}`
      }
    }).then(response => {
      const taskList = response.data;
      console.log(taskList);
      this.setState({ taskList });
      console.log(this.state.taskList);
    });

    axios({
      method: "get",
      url: "http://localhost:8000/sprints/api/settings/1/?format=json",
      headers: {
        Authorization: `Token ${this.state.token}`
      }
    }).then(response => {
      const settings = response.data;
      this.setState(settings);
    });

    this.setState({ isMounted: true });
  }

  /**
   * Determines if a task should be displayed in the list.
   * Checks to see if a task is focused. If it is, then it should not be in the
   * list. Also, completed tasks should not be in the list.
   * 
   * @param {Object} item    task list item. 
   */
  shouldDisplayItem(item) {
    if (this.state.focusedTask != null) {
      if (this.state.focusedTask.id === item.id) {
        return false;
      }
    }

    return this.checkIfIncomplete(item.completed);
  }

  checkIfIncomplete(complete) {
    return !complete;
  }

  /**
   * Sets state variables so the task list can shift over to focus on one task specifically.
   * 
   * @param {EventTarget} event  has a target of the outermost item's div.
   */
  handleTaskItemClick(event) {
    const taskID = event.currentTarget.id;   // Get unique task id.

    // Search through task list to find task with given id.
    let task = this.state.taskList.filter(function (task) {
      return parseInt(task.id, 10) === parseInt(taskID, 10);
    });
    this.setState({ focusedTask: task[0] });
  }

  render() {
    const point_hour = this.state.settings.point_hour_ratio;
    if (this.state.isMounted) {
      return (
        <div className={this.state.focusedTask !== null ? "task-list-shifted" : "task-list"}>
          {this.state.taskList.filter((item) => this.shouldDisplayItem(item)).map(item =>
            <div className="task-list-item" key={item.id} id={item.id} onClick={this.handleTaskItemClick}>
              <div key={item.id} id={item.id}>
                <span className="task-name-item"> {item.name} </span>
                <span className="task-time-item"> {item.time} mins </span>
                <span className="task-points-item"> {item.time / 60 * point_hour} pts</span>
              </div>
            </div>
          )
          }
        </div>
      );
    } else {
      return null;
    }
  }
}

export default TaskList;