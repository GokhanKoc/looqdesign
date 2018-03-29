import React, { Component } from 'react';
//import { MainNavigator } from '../components/Navigator';
import {
    View,
    StyleSheet
} from 'react-native';



import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AnswerScreen from '../screens/AnswerScreen';
import CategorySelectionScreen from '../screens/CategorySelectionScreen';


import { TabNavigator, StackNavigator } from 'react-navigation';

const MainNavigator = TabNavigator ({
  welcome: { screen: WelcomeScreen },
  signup: { screen: SignUpScreen },
  main: {
      screen: TabNavigator({
        home: { screen: HomeScreen },
        settings: { screen: SettingsScreen },
        answer: { screen: AnswerScreen },
        register: { screen: RegisterScreen },
        categories: { screen: CategorySelectionScreen }
      },{
        navigationOptions: {
          tabBarVisible: true
        },
        lazy: true,
      }
    )
  }
}, {
  navigationOptions: {
    tabBarVisible: false
  },
  lazy: true,
});

export default class MainContainer extends Component {

    constructor(props) {
      super(props);
    }

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
      },
      map: {
          flex: 1,
          width: null,
          height: null,
      },
      dots: {
          width: 20,
          height: 20
      },
      searchInputView: {
          backgroundColor: 'rgba(0,0,0,0)',
          position: 'absolute',
          top: 0,
          left: 5,
          right: 5
      },
      searchInput: {
          height: 36,
          padding: 10,
          marginTop: 20,
          marginLeft: 10,
          marginRight: 10,
          fontSize: 18,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: '#48BBEC',
          backgroundColor: 'white'
      }
  });
