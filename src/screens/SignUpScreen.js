import React, { Component } from 'react';
import { SocialIcon, Button } from 'react-native-elements';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux/actions'

// FIREBASE RELATED ITEMS
import { firebaseAuth,firebaseDatabase } from '../firebase/firebase';
import * as routeConstants from '../constants/routeConstants';


class SignUpScreen extends Component {


  facebookLogin = () => {

    // Halihazırda bir kullanıcı var mı yok mu?
    if (firebaseAuth.currentUser) {
      this.props.navigation.navigate(routeConstants.ROUTE_HOME);
    } else {
      // No user is signed in.
      this.props.facebookLogin();
    }

  }

  //TODO Google login halledilmeli
  googleLogin = async () => {

    // Halihazırda bir kullanıcı var mı yok mu?
    if (firebaseAuth.currentUser) {

        // Bir kullanıcı ile login durumunda olunduğundan ana sayfaya yönlendir.
        this.props.navigation.navigate(routeConstants.ROUTE_HOME);
    } else {
        this.props.googleLogin();
    }
  }


  logOut = () => {

    firebaseAuth.signOut().then(() => {
      this.props.dispatchLogOut();
    }, function(error) {
      console.log("Logout Failed!", error);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete (props) {
    if (props.auth.uid) {
      //User registered
      //GET User infos
      firebaseDatabase.ref('users/').child(props.auth.uid).once('value').then( (user) => {

        //IF User registered before than go to Home page, otherwise go to Register page.
        if(user.val().registered) {
          this.props.navigation.navigate(routeConstants.ROUTE_HOME);
        } else {
          this.props.navigation.navigate(routeConstants.ROUTE_REGISTER);
        }
      })
    }
  }


  render() {
      return (
          <View style={styles.wrapper}>
            <ImageBackground
              source={require('../assets/images/sign-up-bg.jpg')}
              style={styles.backgroundImage}>
              <View style={styles.container}>
                <View style={styles.bottom}>

                  <SocialIcon
                    title='Sign In With Facebook'
                    button
                    type='facebook'
                    onPress={this.facebookLogin}
                    buttonStyle= { styles.facebookButton }
                  />
                  <SocialIcon
                    title='Sign In With Google'
                    button
                    type='google-plus-official'
                    onPress={this.googleLogin}
                    buttonStyle= { styles.facebookButton }
                  />

                  <Button
                    buttonStyle={[styles.button, styles.loginButton]}
                    textStyle={{textAlign: 'center'}}
                    title={`LOGOUT`}
                    onPress={this.logOut}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
      );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    backgroundImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        flexDirection: "column"
    },
    bottom: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        margin: 20,
        marginBottom: 80
    },
    input: {
        fontSize: 20,
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        backgroundColor: "#EEE",
        borderRadius: 5
    },
    loginButton: {
        backgroundColor: "#FFC107",
        borderWidth: 0
    },
    facebookButton: {
        borderColor: "#3b5998"
    },
    button: {
        justifyContent: 'center',
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10
    },
    separationContainer: {
        flexDirection: 'row',
        height: 20,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        height: 1,
        width: 30,
        borderBottomWidth: 1
    },
    dividerCenter: {
        marginLeft: 5,
        marginRight: 5
    },
    dividerText: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
