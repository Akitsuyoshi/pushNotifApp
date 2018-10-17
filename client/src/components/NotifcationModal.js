import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import BarChart from './BarChart';
import { changeVisualizeModal } from '../actions';

const NotificaitonModal = ({ openVisualize, onCloseModal }) => {
  return (
    <div>
      <Modal open={openVisualize} onClose={onCloseModal} center>
          <h2>Push Notification</h2>
          <BarChart />
        </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  openVisualize: state.openVisualize,
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch(changeVisualizeModal(false));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificaitonModal);