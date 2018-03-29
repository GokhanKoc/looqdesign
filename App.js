import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './src/redux/store';
import MainContainer from './src/screens/MainContainer';

export default class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainContainer/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});
