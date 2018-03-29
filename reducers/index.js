import { combineReducers } from 'redux';
import { persistCombineReducers } from 'redux-persist';


import auth from './auth';
import location from './location';
import questions from './questions';
import chats from './chats';

import storage from 'redux-persist/lib/storage' // or whatever storage you are using

 const config = {
  key: 'primary',
  storage
 }

const appReducer = persistCombineReducers(config, {
  /* your app’s top-level reducers */
  auth, questions, chats,location
})

export default rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}
