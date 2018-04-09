
import { Facebook, Google } from 'expo';
import firebase, { firebaseAuth, firebaseDatabase } from '../../firebase/firebase';
import * as constants from '../../constants/dataConstants';


import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  EMAIL_LOGIN_SUCCESS,
  EMAIL_LOGIN_FAIL,
  USER_LOGOUT
} from './types';


/**
Redux thunk sayesinde action fonksiyonlarını aşağıdaki gibi yazabiliriz.
export const logout = (my_params) => (dispatch) => {
  dispatch({type: ‘APP_LOGOUT_STARTED’});
  // do your async stuff (ie: network calls)
  // in some callback, you can keep dispatching:
  dispatch({type: ‘APP_LOGOUT_ENDED’})
}
*/



export const facebookLogin = () => async dispatch => {
    doFacebookLogin(dispatch);
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('865641106891961', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    console.log("CREDENTIAL"+credential);

    // Sign in with credential from the Facebook user.
    firebaseAuth.signInWithCredential(credential).then((user) => {


      if(!checkUserIfRegister(user.uid)) {
        firebaseDatabase.ref('users/').child(user.uid).set({
          registered: false,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          categories: {
            fun: true,
            surprise: true,
            event: true,
            hotel: true,
            food: true
          }
        })
      }
      return dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: user });

    }).catch((error) => {
      // Handle Errors here.
      console.log(error);
      return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    });

  }

};

checkUserIfRegister = (uid) => {
  //GET User infos
  firebaseDatabase.ref('users/').child(uid).once('value').then( (userInfos) => {
    return userInfos.val().registered
  })
}



export const googleLogin = () => async dispatch => {
    doGoogleLogin(dispatch);
};


const doGoogleLogin = async dispatch => {

  try {

    const result = await Google.logInAsync({
           androidClientId: '672453373918-7p5q8m628oiqmqjlg1k60h9e9g5itf12.apps.googleusercontent.com',
           iosClientId: '672453373918-vbbu7fk0ovu2vsn0pj54mkl2o9a0nj59.apps.googleusercontent.com',
           scopes: ['profile', 'email'],
         });

    if (result.type != 'success') {
      return dispatch({ type: GOOGLE_LOGIN_FAIL });
    }


    if (result.type === 'success') {
      // Build Firebase credential with the Google access token.
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);

      // Sign in with credential from the Google user.
      let user = await firebaseAuth.signInWithCredential(credential);

      let userInfos= await firebaseDatabase.ref('users/').child(user.uid).once('value');


      // User has no profile yet
      if(userInfos.val() === null) {

        firebaseDatabase.ref('users/').child(user.uid).set({
            registered: false,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            categories: {
              fun: true,
              surprise: true,
              event: true,
              hotel: true,
              food: true
            }
          })
      }
      return dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: user });
    }

  } catch(error) {
    console.log(error);
    return dispatch({ type: GOOGLE_LOGIN_FAIL });
  }
}

export const dispatchLogOut = () => (dispatch) => {
  dispatch({type: USER_LOGOUT})
}
