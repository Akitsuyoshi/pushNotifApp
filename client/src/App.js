import React, { Component } from 'react';
import './App.css';

import MDSpinner from "react-md-spinner";
import ModalComponent from "./ModalComponent";
import SimpleList from './ListComponent';

class App extends Component {
  state = {
    devices: [],
    isFetched: false,
    subscribersNum: null,
    open: false,
    token: "",
    title: "",
    content: "",
  };

  componentDidMount() {
    this.getUsers()
      .then(res => {
        console.log(res);
        if (res.status === "error") {
          this.setState({ subscribersNum: 0 });
          throw res.msg;
        } 
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

  pushNotification = async (title, message, token) => {
    console.log(title, token, message);
    const response = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify({ title, message, token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();

    if (body.status === 'ok') {
      this.onCloseModal();

    } else {
      alert('something wrong happed, it couldn\'t push notification');
    }
    return body;
  }

  onOpenModal = (e) => {
    const token = e.target.parentNode.getAttribute('token');
    console.log(token);
    this.setState({ open: true, user: token});
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  changeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  changeContent = (e) => {
    this.setState({ content: e.target.value });
  };

  render() {
    const { devices, isFetched, subscribersNum, open, user, title, content } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">subscriber contact list</h1>
        </header>
        <ModalComponent 
          open={open} 
          user={user} 
          onCloseModal={this.onCloseModal} 
          pushNotification={this.pushNotification} 
          changeContext={this.changeContext}
          changeTitle={this.changeTitle}
          title={title}
          content={content}
        />
        {(isFetched === false && subscribersNum === null)? <div><MDSpinner size={40} /></div>: ""}
        <SimpleList devices={devices} onOpenModal={this.onOpenModal} />
      </div>
    );
  }
}

export default App;