import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';

import MDSpinner from "react-md-spinner";
import NotificaitonModal from './NotifcationModal';
import NotificationList from './NotificationList';

import { changeModalWithTokens, getNotifications } from '../actions';

class Notifications extends Component {
  componentDidMount() {
    getNotifications();
  }
  render() {
    const { isFetched, openModal, devices } = this.props;

    return (
      <div className="bodyContent">
        <h3>Contact List</h3>
        <hr />
        <button onClick={() => {
          const tokens = devices.map(device => device.token);
          openModal(tokens)
        }} title="open visualize modal">New Push Notification</button>
        {(isFetched === false)? <div><MDSpinner size={40} /></div>: ""}
        <NotificaitonModal/>
        <NotificationList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  devices: state.devices,
  tokens: state.tokens,
});

const mapDispatchToProps = dispatch => ({
  openModal: (devices) => {
    dispatch(changeModalWithTokens(devices));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);