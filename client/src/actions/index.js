export const CHANGE_MODAL = 'CHANGE_MODAL';
export const CHANGE_MODAL_WITH_TOKENS = 'CHANGE_MODAL_WITH_TOKENS';
export const CHANGE_VISUALIZE_MODAL = 'CHANGE_VISUALIZE_MODAL';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_OPEN_MODAL = 'CHANGE_OPEN_MODAL';
export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const CHANGE_IS_FETCHED = 'CHANGE_IS_FETCHED';
export const SET_DEVICES = 'SET_DEVICES';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const DELETE_DEVICES = 'DELETE_DEVICES';
export const CHANGE_PAGE = 'CHANGE_PAGE';

// asyncrounous function to get or post data to server
export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(changeIsFetched(false));
      const response = await fetch('/api/users');
      const body = await response.json();
      dispatch(changeIsFetched(true));

      if (body.status !== "error") {
        dispatch(setDevices(body));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const getNotifications = () => {
  return async (dispatch) => {
    try {
      dispatch(changeIsFetched(false));
      const response = await fetch('/api/notifications');
      const body = await response.json();
      dispatch(changeIsFetched(true));

      if (body.status !== "error") {
        dispatch(setNotifications(body));
      }
    } catch (error) {
      console.log(error);
    }
  }
};


const storeRecepientToDB = async (recepient, notificationId) => {
  try {
    const response = await fetch('/api/recipient', {
      method: 'POST',
      body: JSON.stringify({ status: recepient.status, expoNotifId: recepient.id, notificationId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    console.log(body);
  } catch (error) {
    console.log(error);
  }
};

const storeNotificationToDB = async (token, recepient) => {
  try {
    const response = await fetch('/api/notification', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    storeRecepientToDB(recepient, body._id);
  } catch (error) {
    console.log(error);
  }
};

export const pushNotification = (title, message, token) => {
  return async (dispatch) => {
    try {
      dispatch(changeIsFetched(false));
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({ title, message, token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(changeIsFetched(true));
      const body = await response.json();

      if (!token) {
        alert('token is not set to this user, please try it again aftter reloading page');
      }
    
      if (body.status === 'ok') {
        dispatch(changeModal(false, null));
        storeNotificationToDB(token, body);
      } else {
        // dispatch(storeReceipentToDB(body));
        alert('something wrong happed, it couldn\'t push notification');
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// It sends notificaiton to all subscribers at once
export const pushNotifications = (title, message, tokens) => {
  return async (dispatch) => {
    try {
      dispatch(changeIsFetched(false));
      const response = await fetch('/api/sendtoAll', {
        method: 'POST',
        body: JSON.stringify({ title, message, tokens }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(changeIsFetched(true));
      const body = await response.json();

      if (!tokens) {
        alert('tokens is not set to this user, please try it again aftter reloading page');
      }
    
      // if (body.status === 'ok') {
        
      //   // storeNotificationToDB(tokens, body);
      // } else {
      //   // dispatch(storeReceipentToDB(body));
      //   alert('something wrong happed, it couldn\'t push notification');
      // }
      dispatch(changeOpenModal(false, null));
    } catch (error) {
      console.log(error);
    }
  }
};



// here are action creaters
export const changeModal = (newOpen, newState) => ({
  type: CHANGE_MODAL,
  open: newOpen,
  token: newState,
});

export const changeModalWithTokens = (tokens) => ({
  type: CHANGE_MODAL_WITH_TOKENS,
  tokens,
});

export const changeOpenModal = (newOpen, newState) => ({
  type: CHANGE_OPEN_MODAL,
  open: newOpen,
  tokens: newState,
});

export const changeVisualizeModal = (newOpen)  => ({
  type: CHANGE_VISUALIZE_MODAL,
  open: newOpen,
})

export const changeTitle = (newTitle) => ({
  type: CHANGE_TITLE,
  title: newTitle,
});

export const changeContent = (newContent) => ({
  type: CHANGE_CONTENT,
  content: newContent,
});

export const changeIsFetched = (newIsFetched) => ({
  type: CHANGE_IS_FETCHED,
  isFetched: newIsFetched,
});

export const setDevices = (devices) => ({
  type: SET_DEVICES,
  devices,
});

export const setNotifications = (notifications) => ({
  type: SET_NOTIFICATIONS,
  notifications,
})

export const deleteDevice = (deviceTobeDeleted) => ({
  type: DELETE_DEVICES,
  deviceTobeDeleted,
});

export const changePage = (newTab)  => ({
  type: CHANGE_PAGE,
  tab: newTab,
})