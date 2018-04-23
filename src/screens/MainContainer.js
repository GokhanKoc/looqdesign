import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';



import WelcomeScreen from '../screens/WelcomeScreen';
import QuestionScreen from '../screens/QuestionScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AnswerScreen from '../screens/AnswerScreen';
import AnswerChat from '../screens/AnswerChat';


import { TabNavigator } from 'react-navigation';


const MainNavigator = TabNavigator ({
  //welcome: { screen: WelcomeScreen },
  signup: { screen: QuestionScreen }});

export default class MainContainer extends Component {

    render() {
        return (
          <View style={styles.container}>
            <MainNavigator/>
          </View>
        );
    }
  }


  const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
          backgroundColor: '#F5FCFF'
      }
  });
