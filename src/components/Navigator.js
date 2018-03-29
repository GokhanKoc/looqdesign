import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AskQuestionScreen from '../screens/AskQuestionScreen';


import { TabNavigator, StackNavigator } from 'react-navigation';


export const MainNavigator = TabNavigator ({
  welcome: { screen: WelcomeScreen },
  signup: { screen: SignUpScreen },
  main: {
      screen: TabNavigator({
        home: { screen: HomeScreen },
        settings: { screen: SettingsScreen },
        question: { screen: AskQuestionScreen }
      }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          labelStyle: { fontSize: 12 }
      }
    })
  }
}, {
  navigationOptions: {
    tabBarVisible: false
  },
  lazy: true,
});
