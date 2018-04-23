import React, { Component } from 'react';
import { SocialIcon, Button } from 'react-native-elements';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity } from 'react-native';


var {height, width} = Dimensions.get('window');

// FIREBASE RELATED ITEMS
import * as routeConstants from '../constants/routeConstants';
import * as dataConstants from '../constants/dataConstants';
import * as firebaseDbConstants from '../constants/firebaseDbConstants';


import { _ } from 'lodash';

class SignUpScreen extends Component {





  facebookLogin = () => {


  }

  //TODO Google login halledilmeli
  googleLogin = async () => {

  }


  logOut = () => {

  }


  render() {
      return (
          <View style={styles.wrapper}>
            <ImageBackground
              source={require('../assets/images/sign-up-bg.jpg')}
              style={styles.backgroundImage}>
              <View style={styles.container}>
                <View style={styles.buttons}>

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
                    buttonStyle= { styles.googleButton }
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



export default SignUpScreen;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
      //justifyContent: 'center',
      // alignItems: 'stretch'
    },
    backgroundImage: {
        width: width,
        height: height
    },
    container: {
        flex: 1,
        //justifyContent: 'flex-end',
        //alignItems: 'stretch',
        //flexDirection: "column"
    },
    buttons: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        margin: 20,
        marginBottom: 80
    },
    loginButton: {
        backgroundColor: "#FFC107",
        borderWidth: 0
    },
    button: {
        justifyContent: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 100,
        margin: 10
    }
});
