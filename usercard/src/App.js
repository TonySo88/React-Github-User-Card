import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { render } from 'react-dom';
import React from 'react';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      followers: [],
      users: ''
    }
  }

  componentDidMount(){
    axios
      .get("https://api.github.com/users/tonyso88")
      .then((response) => {
        console.log("response", response)
      this.setState({ users: response.data });
      })
     .catch((error) => console.log(error))
    axios.get(`https://api.github.com/users/tonyso88/followers`)
      .then(response => {
        this.setState({
          followers: response.data
        })
      })
      .catch(error => console.log(error))
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.users !== this.state.users) {
      console.log("users have changed");
    }
    if (prevState.followers !== this.state.followers) {
      console.log("state updated, userType", this.state.userType);
    }
  }

  handleChanges = (e) => {
    this.setState({
      ...this.state,
      userType: e.target.value,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Github Usercard</h1>
        <input 
          type="text"
          value={this.state.userType}
          onChange={this.handleChanges}
        />
        <button onClick={this.fetchUsers}>Fetch Users</button>
        <div className="followers">
        <h1>{this.state.users.login}</h1>
          <img width="200" className="user" src={this.state.users.avatar_url} />
          {this.state.followers.map(followers => {
            return (
              <div>
                <h2>{followers.login}</h2>
                <img width="200" src={followers.avatar_url} />
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}
export default App;
