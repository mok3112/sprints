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
            taskID: parseInt(props.taskID, 10),
            task: null,
            timerID: null,
        };

        this.onTick = this.onTick.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/sprints/api/tasks/${this.state.taskID}/?format=json`)
            .then(response => {
                const task = response.data;
                console.log(task);
                const time = response.data.time;
                this.setState({task: task, time: time * 60, timerID: setInterval(this.onTick, 1000)});
            });
    }

    componentWillUnmount() {
        this.setState({ timerID: null });
    }

    onTick() {
        let newTime = this.state.time--;
        if (newTime === 0) {
            clearInterval(this.state.timerID);
            axios({
                method: "patch",
                url: `http://localhost:8000/sprints/api/tasks/${this.state.taskID}`,
                data: {
                    name: this.state.task.name,
                    time: this.state.task.time,
                    completed: true,
                    id: this.state.task.id

                }
            }).then(response => console.log(response));
        } else {
            newTime--;
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
        return(
          <div>
              <h2>{minutes}:{seconds}</h2>
          </div>
        );
    }
}

export default Timer;