'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Platform,
    View,
    Image
} from 'react-native';


export default class SettingsScreen extends Component {

  static navigationOptions = {
    title: 'Settings',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/images/iconset_burger.png')}
        style={[styles.burger, {tintColor: tintColor}]}
      />
    )
  }

    render() {
        return (
            <View>
              <Text>SettingsScreen SALE</Text>
              <Text>SettingsScreen SALE</Text>
              <Text>SettingsScreen SALE</Text>
              <Text>SettingsScreen SALE</Text>
              <Text>SettingsScreen SALE</Text>

            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: 50
    },
    burger: {
        width: 20,
        height: 20
    }
});
