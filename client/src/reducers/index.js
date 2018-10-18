import { CHANGE_MODAL,
         CHANGE_MODAL_WITH_TOKENS,
         CHANGE_TITLE,
         CHANGE_CONTENT,
         CHANGE_IS_FETCHED,
         SET_DEVICES,
         DELETE_DEVICES,
         CHANGE_VISUALIZE_MODAL,
         CHANGE_PAGE,
         CHANGE_OPEN_MODAL,
         SET_NOTIFICATIONS,
} from '../actions';

const initialState = {
  devices: [],
  notifications: [],
  isFetched: false,
  subscribersNum: null,
  open: false,
  openNotification: false,
  openVisualize: false,
  token: "",
  tokens: [],
  title: "",
  content: "",
  tab: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MODAL: {
      return { ...state, token: action.token, open: action.open };
    }
    case CHANGE_MODAL_WITH_TOKENS: {
      return { ...state, openNotification: true, tokens: action.tokens };
    }
    case CHANGE_OPEN_MODAL: {
      return { ...state, tokens: action.tokens, openNotification: action.open };
    }
    case CHANGE_VISUALIZE_MODAL: {
      return { ...state, openVisualize: action.open };
    }
    case CHANGE_TITLE: {
      return { ...state, title: action.title };
    }
    case CHANGE_CONTENT: {
      return { ...state, content: action.content };
    }
    case CHANGE_IS_FETCHED: {
      return { ...state, isFetched: action.isFetched };
    }
    case SET_DEVICES: {
      return { ...state, devices: action.devices };
    }
    case DELETE_DEVICES: {
      const updatedDevices = state.devices.filter(device => {
        return device.name !== action.deviceTobeDeleted.name;
      });
      return { ...state, device: updatedDevices };
    }
    case CHANGE_PAGE: {
      return { ...state, tab: action.tab}
    }
    case SET_NOTIFICATIONS: {
      return { ...state, notifications: action.notifications}
    }
    default: {
      return state;
    }
  }
};

export default reducer;

