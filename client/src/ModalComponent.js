import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Modal from "react-responsive-modal";

import store from './reducers/store';

import { changeModal, changeTitle, changeContent, pushNotification } from './actions';

const ModalComponent = ({token, open, onCloseModal, sendNotification, updateTitle, updateContent, content, title}) => {
  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
          <h2>Push Notification</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            store.dispatch(pushNotification(title, content, token));
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
  open: state.open,
  token: state.token,
  content: state.content,
  title: state.title,
});

const mapDispatchToProps = dispatch => ({
  onCloseModal: () => {
    dispatch(changeModal(false, null));
  },
  updateTitle: (e) => {
    const newTitle = e.target.value;
    dispatch(changeTitle(newTitle));
  },
  updateContent: (e) => {
    const newContent = e.target.value;
    dispatch(changeContent(newContent));
  },
  sendNotification: (title, content, token) => {
    store.dispatch(pushNotification(title, content, token));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalComponent);