/**
 * @author  koml12
 * Created: 8/18/18
 */

import React, { Component } from 'react';

import "./index.css";

import { StartTaskButton, BackButton } from "../Buttons/index.js";

/**
 * Class that holds the reference to a task that has just been clicked.
 * Sets off a timer that runs for the duration of the task.
 */
class ActiveTask extends Component {

  render() {
    const task = this.props.task;
    return (
      <div className="active-task">
        <h1>{task.name}</h1>
        <h2>{task.time} minutes</h2>
        <StartTaskButton task={task} token={this.props.token} onFinish={this.props.onFinish} />
        <BackButton onClick={this.props.onBackClicked} />
      </div>
    )
  }
}

export default ActiveTask;