import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
      axios.get('http://localhost:8000/sprints/api/tasks/?format=json')
          .then(response => {
              const tasks = response.data;
              this.setState({tasks});
          });
    }

    componentDidUpdate() {
        this.componentDidMount();
    }


    render() {
        console.log(this.state.tasks);
        return (
        <div>
            <Header />
            <Sidebar />
            <TaskList taskList={this.state.tasks}/>
            <TaskAdderForm />
        </div>
    );
  }
}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: props.taskList,
    };
  }

  componentDidMount() {
      axios.get('http://localhost:8000/sprints/api/tasks/?format=json')
          .then(response => {
              const taskList = response.data;
              this.setState({taskList});
          })
  }

  render() {
    return (
      <div className="task-list">
        {this.state.taskList.map(item =>
          <div className="task-list-item">
            <span className="task-name-item"> {item.name} </span>
            <span className="task-time-item"> {item.time} mins </span>
          </div>
        )}
      </div>
    );
  }
}

const Header = () =>
      <div className="topnav header">
        <a href="#" className="header-item app-title">My App</a>
        <a className="active header-item" href="#">About</a>
        <a href="#login" className="header-item">Log In</a>
        <a href="#signup" className="header-item">Sign Up</a>
      </div>;

const Sidebar = () =>
  <div className="sidebar">
    <div className="sidebar-item">
      <input type="text" placeholder="Search"/>
    </div>
    <div className="sidebar-item">
      <a href="#" className="sidebar-link">Filter</a>
    </div>
    <div className="sidebar-item">
      <a href="#" className="sidebar-link">Stats</a>
    </div>
    <div className="sidebar-item">
      <a href="#" className="sidebar-link">My Goals</a>
    </div>
  </div>;


class TaskAdderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            time: '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleTimeChange(event) {
        this.setState({time: event.target.value});
    }

    handleSubmit(event) {
        axios.post('http://localhost:8000/sprints/api/tasks/',
            {
                name: this.state.name,
                time: this.state.time,
                completed: false,
            }
        );
    }

    render() {

        return(
          <div className="task-adder">
              <form onSubmit={this.handleSubmit}>
                  <span>
                      <input type="text" onChange={this.handleNameChange} placeholder="Task name" />
                      <input type="number" onChange={this.handleTimeChange} placeholder="Time" />
                      <input type="submit" value="Submit" />
                  </span>
              </form>
          </div>
        );
    }
}


export default App;
