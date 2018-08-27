/**
 * @author koml12
 * Created: 8/26/18 
 */

import React, { Component } from 'react'

/**
 * 
 */
class BackButton extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onClick}>Cancel</button>
      </div>
    )
  }
}

export default BackButton;