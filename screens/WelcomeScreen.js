import React, { Component } from 'react';
import { View, Text,AsyncStorage } from 'react-native';
import _ from 'lodash';
import {
  AppLoading,
} from 'expo';


import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to LOOQ', color: '#03A9F4' },
  { text: 'Use this to find awesome things', color: '#009688' },
  { text: 'Set your dreams, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {

  state= { token: null}

  async componentWillMount() {
    AsyncStorage.removeItem('fb_token');
    let token = await AsyncStorage.getItem('fb_token');

    if(token) {
      this.props.navigation.navigate('auth');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  // Slideslar tamamlandıktan sonra kayıt sayfasına yönlendirmeli.
  onSlidesComplete = () => {
    this.props.navigation.navigate('signup');
  }


  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
    );
  }
}


export default WelcomeScreen;
