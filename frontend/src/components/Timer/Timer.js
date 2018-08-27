/**
 * @author mok3112
 * Created: 3/27/18
 */

import React, { Component } from "react";
import axios from "axios";

/**
 * Component that handles the actual "doing" of a task when the StartButton
 * component is clicked for a particular task.
 * After the timer runs out, the task is marked as completed.
 */
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskID: props.task.id,
      token: props.token,
      time: props.task.time,
      task: props.task,
      timerID: null,
    };

    this.onTick = this.onTick.bind(this);
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:8000/sprints/api/tasks/" + this.state.taskID.toString() + "/?format=json",
      headers: {
        Authorization: `Token ${this.state.token}`
      }
    })
      .then(response => {
        const task = response.data;
        console.log(task);
        const time = response.data.time;
        this.setState({
          task: task,
          time: time * 60,
          timerID: setInterval(this.onTick, 1000)
        });
      })
  }

  componentWillUnmount() {
    this.setState({ timerID: null });
  }

  onTick() {
    let newTime = this.state.time - 1;
    if (newTime === 0) {
      clearInterval(this.state.timerID);
      axios({
        method: "patch",
        url: `http://localhost:8000/sprints/api/tasks/${this.state.taskID}/`,
        headers: {
          Authorization: `Token ${this.state.token}`
        },
        data: {
          name: this.state.task.name,
          time: this.state.task.time,
          completed: true,
          id: this.state.task.id
        }
      }).then(response => {
        console.log(response);
        this.props.onFinish();
      });
    } else {
      this.setState({ time: newTime });
    }
  }

  render() {
    let minutes = Math.floor(this.state.time / 60) + "";
    let seconds = this.state.time % 60 + "";
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return (
      <div>
        <p>{minutes}:{seconds}</p>
      </div>
    );
  }
}

export default Timer;