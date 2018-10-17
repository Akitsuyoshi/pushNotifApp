import React, { Component } from 'react';
import '../App.css';

import { connect } from 'react-redux';

import MDSpinner from "react-md-spinner";
import ModalComponent from "./ModalComponent";
import NotificaitonModal from './NotifcationModal';
import NotificationList from './NotificationList';

import { changeModalWithoutToken } from '../actions';

class Notifications extends Component {
  componentDidMount() {
  }
  render() {
    const { isFetched, openModal } = this.props;

    return (
      <div className="bodyContent">
        <h3>Contact List</h3>
        <hr />
        <button onClick={openModal} title="open visualize modal">New Push Notification</button>
        {(isFetched === false)? <div><MDSpinner size={40} /></div>: ""}
        <NotificaitonModal/>
        <ModalComponent />
        <NotificationList />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  openModal: () => {
    dispatch(changeModalWithoutToken(true));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Notifications);