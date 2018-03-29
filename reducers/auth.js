import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL
} from '../actions/types';


export default function(state = {},action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return action.payload ;
    case FACEBOOK_LOGIN_FAIL:
      return {} ;
    case GOOGLE_LOGIN_SUCCESS:
      return action.payload ;
    case GOOGLE_LOGIN_FAIL:
      return {} ;
    default:
      return state;
  }
}
