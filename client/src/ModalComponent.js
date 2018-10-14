import React from 'react';
import './App.css';

import Modal from "react-responsive-modal";

export default function ModalComponent(props) {
  const { open, onCloseModal, user, pushNotification, changeContext, changeTitle, content, title } = props;
  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
          <h2>Push Notification</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            pushNotification(title, content, user);
          }}>
            <label>
              Title:
              <input type="text" name="title" onChange={changeTitle} />
            </label>
            <div></div>
            <label>
              Body:
              <input type="text" name="content" onChange={changeContext} />
            </label>
              <input type="submit" value="Submit" />
          </form>
        </Modal>
    </div>
  )
}