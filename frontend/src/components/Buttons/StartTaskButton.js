import React, { Component } from 'react'

import Timer from "../Timer";

class StartTaskButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
      taskID: props.id,
      token: props.token,
      clicked: false
    };

    this._onClick = this._onClick.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
  }

  _onClick() {
    this.setState({ clicked: true });

    const data = {
      clicked: true,
      taskID: this.state.taskID
    };

    this.props.onButtonClick(data);
  }

  renderTimer() {
    return this.state.clicked ? <Timer taskID={this.state.taskID} token={this.state.token} /> : null;
  }

  render() {
    return (
      <div>
        <button onClick={this._onClick}>Start</button>
        {this.renderTimer()}
      </div>
    )
  }
}

export default StartTaskButton;