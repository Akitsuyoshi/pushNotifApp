import React, { Component } from 'react';
import './App.css';

import MDSpinner from "react-md-spinner";

class App extends Component {
  state = {
    devices: [],
    isFetched: false,
  };

  componentDidMount() {
    this.getUsers()
      .then(res => {
        console.log(res);
        return this.setState({ devices: res, isFetched: true});
      })
      .catch(err => console.log(err));
  }

  getUsers = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();

    if (body.length === 0) return "No subscribers";
    return body;
  };

  render() {
    const { devices, isFetched } = this.state;
    const users = devices.map((user, i) => {
      return <li key={i}>{user.name} : {(user.isSubscribed)? "true": "false"} : {user.registrationDate}</li>
    })
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {(isFetched === false)? <div><MDSpinner size={40} /></div>: ""}
        <ul>
          {users}
        </ul>
      </div>
    );
  }
}

export default App;