import React from 'react';
import '../App.css';

import { connect } from 'react-redux';

import MDSpinner from "react-md-spinner";
import ModalComponent from "./ModalComponent";
import SimpleList from './ListComponent';
import NotificaitonModal from './NotifcationModal';

const Subscribers = ({ isFetched }) => {
  return (
    <div className="bodyContent">
      <h3>Contact List</h3>
      <hr />
      {(isFetched === false)? <div><MDSpinner size={40} /></div>: ""}
      <NotificaitonModal/>
      <ModalComponent />
      <SimpleList />
    </div>
  );
}

const mapStateToProps = state => ({
  isFetched: state.isFetched,
});

export default connect(
  mapStateToProps,
  null
)(Subscribers);