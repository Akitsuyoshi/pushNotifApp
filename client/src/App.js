import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
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
    color: 'white',
    endpoint: "http://10.74.119.41:8001"
  };

  async componentDidMount() {
    try {
      const res = await this.getUsers();
      if (res.status === "error") {
        this.setState({ subscribersNum: 0 });
        throw res.msg;
      }
      return this.setState({ devices: res, isFetched: true});  
    } catch (error) {
      console.log(error);
    }
  }

  getUsers = async () => {
    const response = await fetch('/api/users');
    const body = await response.json();

    if (body.length === 0) return "No subscribers";
    return body;
  };

  storeNotification = async (token) => {
    const response = await fetch('/api/notification', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();

    return body;
  }

  pushNotification = async (title, message, token) => {
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

      this.storeNotification(token);
    } else {
      alert('something wrong happed, it couldn\'t push notification');
    }
    return body;
  }

  onOpenModal = (e) => {
    const token = e.target.parentNode.getAttribute('token');
    
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

  send = () => {
    const socket = socketIOClient(this.state.endpoint)
    
    console.log('emit is invoked from here');
    socket.emit('change color', 'red');
  };

  setColor = (color) => {
    this.setState({ color })
  };

  deleteDevice = (deviceTobeDeleted) => {
    const { devices } = this.state;
    const updatedDevices = devices.filter(device => {
      return device.name !== deviceTobeDeleted.name;
    });
    this.setState({ devices: updatedDevices });
  };

  render() {
    const { devices, isFetched, subscribersNum, open, user, title, content, endpoint } = this.state;

    const socket = socketIOClient(endpoint);
    socket.on('update subscriber', (data) => {
      this.deleteDevice(data);
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">subscriber contact list</h1>
        </header>
        <button onClick={this.send}>Change Color</button>
        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
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