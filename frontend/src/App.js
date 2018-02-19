import React, { Component } from 'react';
import './App.css';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'tasks': [],
    };
  }


  componentDidMount() {
      axios.get('http://localhost:8000/sprints/api/tasks/?format=json')
          .then(response => {
              const tasks = response.data;
              this.setState({tasks});
          });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
          {this.state.tasks.map(item =>
            <div>
              <p>{item.name}</p>
              <p>{item.points}</p>
            </div>
          )}
      </div>
    );
  }
}

export default App;
