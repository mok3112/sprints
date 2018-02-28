import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const POINT_HOUR_RATIO = 2;

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


    render() {
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

class Timer extends Component {
    // TODO: pass in task ID in props, handle GET request in this component instead of in TaskList
    constructor(props) {
        super(props);
        this.state = {
            taskID: parseInt(props.taskID, 10),
            time: 0,
            timerID: null,
        };

        this.onTick = this.onTick.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/sprints/api/tasks/${this.state.taskID}/?format=json`)
            .then(response => {
                const time = response.data.time;
                this.setState({time: time * 60, timerID: setInterval(this.onTick, 1000)});
            });
    }


    componentWillUnmount() {
        this.setState({ timerID: null });
    }

    onTick() {
        let newTime = this.state.time;
        if (newTime === 0) {
            clearInterval(this.state.timerID);

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

class StartButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            task: props.task,
        };
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        this.setState({ clicked: true });
    }

    render() {
        return (
            <div>
                <button onClick={this._onClick}>START</button>
                {this.state.clicked ? <Timer taskID={this.state.task} /> : null}
            </div>
        )
    }

}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        taskList: props.taskList,
    };
    this.startTask = this.startTask.bind(this);
    this.checkIfIncomplete = this.checkIfIncomplete.bind(this);
  }

  componentDidMount() {
      axios.get('http://localhost:8000/sprints/api/tasks/?format=json')
          .then(response => {
              const taskList = response.data;
              this.setState({taskList});
          });
  }

  startTask() {
      this.setState({ clicked: true });

  }

  checkIfIncomplete(complete) {
      return !complete;
  }

  render() {
      return (
          <div className="task-list">
              {this.state.taskList.filter((item) => {
                    return !item.completed;
                }).map(item =>
                      <div className="task-list-item" key={item.id}>
                          <div>
                              <span className="task-name-item"> {item.name} </span>
                              <span className="task-time-item"> {item.time} mins </span>
                              <span className="task-points-item"> {item.time / 60 * POINT_HOUR_RATIO} pts</span>
                          </div>
                          <div className="start-button">
                              <StartButton task={item.id}/>
                          </div>
                      </div>
                  )
              }
          </div>
      );
  }
}

/**
 * Top navigation bar for the website.
 * Links to navigate back to the homepage, see info about the app, log in, and sign up.
 */
const Header = () =>
      <div className="topnav header">
        <a href="#" className="header-item app-title">My App</a>
        <a className="active header-item" href="#">About</a>
        <a href="#login" className="header-item">Log In</a>
        <a href="#signup" className="header-item">Sign Up</a>
      </div>;

/**
 * Persistent sidebar, links to search through tasks, see user statistics, and view custom goals per user.
 */
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
