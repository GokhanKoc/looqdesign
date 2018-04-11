
import { Facebook, Google } from 'expo';
import firebase, { firebaseAuth, firebaseDatabase } from '../../firebase/firebase';
import * as firebaseDbConstants from '../../constants/firebaseDbConstants';
import * as expoConstants from '../../constants/expoConstants';
import * as dataConstants from '../../constants/dataConstants';


import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  EMAIL_LOGIN_SUCCESS,
  EMAIL_LOGIN_FAIL,
  USER_LOGOUT
} from './types';

export const facebookLogin = () => async dispatch => {
    doFacebookLogin(dispatch);
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync(expoConstants.EXPO_FACEBOOK_PERMISSION_APP_ID, {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  if (type === 'success') {
    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    firebaseAuth.signInWithCredential(credential).then((user) => {


      if(!checkUserIfRegister(user.uid)) {

        firebaseDatabase.ref('users/').child(user.uid).set({
          [ firebaseDbConstants.FIREBASE_DB_USER_STATUS ]       : false,
          [ firebaseDbConstants.FIREBASE_DB_USER_EMAIL]         : user.email, 
          [ firebaseDbConstants.FIREBASE_DB_USER_DISPLAY_NAME]  : user.displayName, 
          [ firebaseDbConstants.FIREBASE_DB_USER_PHOTO_URL]     : user.photoURL, 
          [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORIES]    : {
            [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_FUN]        : true,
            [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_SURPRISE]   : true,
            [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_EVENT]      : true,
            [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_HOTEL]      : true,
            [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_FOOD]       : true
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
           androidClientId: expoConstants.EXPO_ANDROID_CLIENT_ID,
           iosClientId: expoConstants.EXPO_IOS_CLIENT_ID,
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
      if( userInfos.val() === null ) {

        firebaseDatabase.ref(firebaseDbConstants.FIREBASE_DB_USERS+'/').child(user.uid).set({
            [ firebaseDbConstants.FIREBASE_DB_USER_STATUS ]       : dataConstants.USER_NEW_USER,
            [ firebaseDbConstants.FIREBASE_DB_USER_EMAIL]         : user.email, 
            [ firebaseDbConstants.FIREBASE_DB_USER_DISPLAY_NAME]  : user.displayName, 
            [ firebaseDbConstants.FIREBASE_DB_USER_PHOTO_URL]     : user.photoURL, 
            [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORIES]    : {
              [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_FUN]        : true,
              [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_SURPRISE]   : true,
              [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_EVENT]      : true,
              [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_HOTEL]      : true,
              [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_FOOD]       : true
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
