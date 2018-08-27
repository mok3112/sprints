import React, { Component } from 'react'

import Timer from "../Timer";

class StartTaskButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.task.time,
      taskID: props.task.id,
      token: props.token,
      clicked: false
    };

    this._onClick = this._onClick.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
  }

  _onClick() {
    this.setState({ clicked: true });
  }

  renderTimer() {
    return this.state.clicked ? <Timer task={this.props.task} token={this.state.token} /> : null;
  }

  render() {
    return (
      <div>
        {this.state.clicked ?
          <Timer
            task={this.props.task}
            token={this.props.token}
            onFinish={this.props.onFinish}
          /> :
          <button onClick={this._onClick}>Start</button>
        }
      </div>
    )
  }
}

export default StartTaskButton;