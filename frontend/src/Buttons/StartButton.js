/**
 * @author mok3112
 * Created: 3/22/18
 */

import React, { Component } from "react";
import Timer from "../Timer"

/**
 * Component that manages the Timer component for each task.
 * When clicked, pulls up a Timer component with the data from the task
 * that the button belongs to.
 */
class StartButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            task: props.task,
        };
        this._onClick = this._onClick.bind(this);
        this.shouldShowTimer = this.shouldShowTimer.bind(this);
    }

    _onClick() {
        this.setState({ clicked: true });
    }

    shouldShowTimer() {
        if (this.state.clicked) {
            return (
                <Timer taskID={this.state.task} />
            )
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <button onClick={this._onClick}>START</button>
                {this.shouldShowTimer()}
            </div>
        )
    }
}

export default StartButton;