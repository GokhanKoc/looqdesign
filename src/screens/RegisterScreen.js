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
    Image,
    TextInput
} from 'react-native';
import { Icon, Button,SocialIcon } from 'react-native-elements';
import Map from '../components/Map';
import SearchLocation from '../components/SearchLocation';

const { width, height } = Dimensions.get('window');

let vw = Dimensions.get('window').width /100;
let vh = Dimensions.get('window').height /100;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';

// FIREBASE RELATED ITEMS
import { firebaseAuth,firebaseDatabase } from '../firebase/firebase';
import { _ } from 'lodash';

class RegisterScreen extends Component {

  static navigationOptions = {
    title: 'Register',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/images/iconset_dots.png')}
        style={[styles.dots, {tintColor: tintColor}]}
      />
    )
  }

    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    selectCategory = () => {
      this.props.navigation.navigate('categories')
    }

    render() {

        return (
            <View style={styles.container}>
              <Map style={styles.map}/>
              <View style={styles.searchInputView}>
                <SearchLocation/>
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  buttonStyle={styles.buttonRegister}
                  title='OK'
                  onPress={this.selectCategory}
                />
              </View>
            </View>
        );
    }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

var platformOffset = Platform.OS === 'ios' ? 0 : 10;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginBottom: 50
    },
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
    inputView: {
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        top: 0,
        left: 5,
        right: 5
    },
    searchInputView: {
        backgroundColor: 'rgba(0,0,0,0)',
        position: 'absolute',
        top: 0,
        left: 5,
        right: 5
    },
    input: {
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
    },
    button: {
        position: 'absolute',
        borderRadius: 100,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    },
    categoryWrapper: {
      position: 'absolute',
    },
    buttonWrapper: {
      position: 'absolute',
      bottom: 3*vh
    },
    buttonRegister: {
        position: 'relative',
        borderRadius: 100,
        left: (width /2)-(6*vh),
        right: (width /2)-(6*vh),
        backgroundColor: '#FF3366',
        width: 12*vh,
        height: 12*vh
    },
});
