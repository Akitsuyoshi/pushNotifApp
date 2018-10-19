import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import store from '../reducers/store';

import { changeOpenModal, changeTitle, changeContent, pushNotifications } from '../actions';

const ModalComponent = ({tokens, openNotification, onCloseModal, sendNotification, updateTitle, updateContent, content, title}) => {
  return (
    <div>
      <Modal open={openNotification} onClose={onCloseModal} center>
          <h2>Push Notification</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            store.dispatch(pushNotifications(title, content, tokens));
          }}>
            <label>
              Title:
              <input type="text" name="title" onChange={updateTitle} />
            </label>
            <div></div>
            <label>
              Body:
              <input type="text" name="content" onChange={updateContent} />
            </label>
              <input type="submit" value="Submit" />
          </form>
        </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  openNotification: state.openNotification,
  tokens: state.tokens,
  content: state.content,
  title: state.title,
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch(changeOpenModal(false, null));
  },
  updateTitle: (e) => {
    const newTitle = e.target.value;
    dispatch(changeTitle(newTitle));
  },
  updateContent: (e) => {
    const newContent = e.target.value;
    dispatch(changeContent(newContent));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalComponent);