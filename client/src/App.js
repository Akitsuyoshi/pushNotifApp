import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import './App.css';

import { connect } from 'react-redux';
import { getUsers } from './actions';
import { deleteDevice } from './actions';

import MDSpinner from "react-md-spinner";
import ModalComponent from "./ModalComponent";
import SimpleList from './ListComponent';

class App extends Component {
  componentDidMount() {
    const { getSubscribers } = this.props;
    getSubscribers();
  }
  render() {
    const { isFetched, deleteDevice } = this.props;

    const endpoint = "http://10.136.131.89:8001";
    const socket = socketIOClient(endpoint);
    socket.on('update subscriber', (data) => {
      deleteDevice(data);
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">subscriber contact list</h1>
        </header>
        {(isFetched === false)? <div><MDSpinner size={40} /></div>: ""}
        <ModalComponent />
        <SimpleList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getSubscribers: () => {
    dispatch(getUsers());
  },
  deleteDevice: (deviceTobeDeleted) => {
    dispatch(deleteDevice(deviceTobeDeleted));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(App);