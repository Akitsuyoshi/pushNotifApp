import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import reducer from './index';

let store;
if (process.env.NODE_ENV !== 'production') {
  const loggerMiddleware =  createLogger({
    diff:true,
    collapsed:true,
  });
  store = createStore(reducer, applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ));
} else {
  store = createStore(reducer, applyMiddleware(
    thunkMiddleware
  ));
}

export default store;