import React, { Component } from 'react';
// import socketIOClient from 'socket.io-client'
import './App.css';

import { connect } from 'react-redux';
import { getUsers, deleteDevice, changePage } from './actions';
import {AppBar, Tabs, Tab} from '@material-ui/core';

import Subscribers from './components/Subscribers';
import Notifications from './components/Notifications';

class App extends Component {
  componentDidMount() {
    const { getSubscribers } = this.props;
    getSubscribers();
  }

  onChange = (_, value) => {
    const { tabChange } = this.props;
    tabChange(value);
  }
  render() {
    const { tab } = this.props;

    // const endpoint = process.env.HEROKU_URL || "http://192.168.1.2:8001";
    // const socket = socketIOClient(endpoint);
    // socket.on('update subscriber', (data) => {
    //   deleteDevice(data);
    // });
    return (
      <div className="App">
        <AppBar title="My App">
          <Tabs onChange={this.onChange}>
            <Tab label="&nbsp;HOME&nbsp;" style={{"width": "50%", "maxWidth": "400px"}} />
            <Tab label="&nbsp;NOTIFICATION&nbsp;" style={{"width": "50%", "maxWidth": "400px"}} />
          </Tabs>
        </AppBar>
        {(tab === 0) ? <Subscribers/>: <Notifications/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tab: state.tab,
});

const mapDispatchToProps = dispatch => ({
  getSubscribers: () => {
    dispatch(getUsers());
  },
  deleteDevice: (deviceTobeDeleted) => {
    dispatch(deleteDevice(deviceTobeDeleted));
  },
  tabChange: (tab) => {
    dispatch(changePage(tab));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);