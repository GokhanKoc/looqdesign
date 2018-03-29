import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
//import { AsyncStorage } from 'react-native';



// middleware that logs actions
const logger = createLogger({ predicate: (getState, action) => __DEV__  });


const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(
      thunk,
      logger
    )
  )
)

persistStore(store, null);

export default store;
