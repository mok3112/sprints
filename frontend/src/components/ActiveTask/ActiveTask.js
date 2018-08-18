/**
 * @author  koml12
 * Created: 8/18/18
 */

import React, { Component } from 'react';

import Timer from "../Timer";

/**
 * Class that holds the reference to a task that has just been clicked.
 * Sets off a timer that runs for the duration of the task.
 */
class ActiveTask extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const task = props.task;
    return (
      <div>
        <h1>{task.name}</h1>
        <h2>{task.time}</h2>
        <Timer task={task} token={props.token} />
      </div>
    )
  }
}

export default ActiveTask;