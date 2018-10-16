export const CHANGE_MODAL = 'CHANGE_MODAL';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const CHANGE_IS_FETCHED = 'CHANGE_IS_FETCHED';
export const SET_DEVICES = 'SET_DEVICES';
export const DELETE_DEVICES = 'DELETE_DEVICES';

// asyncrounous function to get or post data to server
export const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(changeIsFetched(false));
      const response = await fetch('/api/users');
      dispatch(changeIsFetched(true));
      
      const body = await response.json();
      if (body.status !== "error") {
        dispatch(setDevices(body));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const storeNotificationToDB = (token) => {
  return async (dispatch) => {
    try {
      dispatch(changeIsFetched(false));
      const response = await fetch('/api/notification', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(changeIsFetched(true));
      const body = await response.json();
    
      console.log("store notificaiton", body);
    } catch (error) {
      console.log(error);
    }
  }
};

export const pushNotification = (title, message, token) => {
  return async (dispatch) => {
    try {
      dispatch(changeIsFetched(false));
      console.log(title, message, token);
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
        dispatch(storeNotificationToDB(token));
      } else {
        alert('something wrong happed, it couldn\'t push notification');
      }
      console.log("push notificaton", body);
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

export const deleteDevice = (deviceTobeDeleted) => ({
  type: DELETE_DEVICES,
  deviceTobeDeleted,
});


