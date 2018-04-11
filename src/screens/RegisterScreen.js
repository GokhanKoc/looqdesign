'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Dimensions,
    Platform,
    View,
    Image,
    TextInput,
    Switch
} from 'react-native';
import { Button } from 'react-native-elements';
import Map from '../components/Map';
import SearchLocation from '../components/SearchLocation';

const { width, height } = Dimensions.get('window');

let vw = Dimensions.get('window').width /100;
let vh = Dimensions.get('window').height /100;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';

import * as routeConstants from '../constants/routeConstants';
import * as firebaseDbConstants from '../constants/firebaseDbConstants';
import * as dataConstants from '../constants/dataConstants';


import { _ } from 'lodash';

import { firebaseAuth,firebaseDatabase } from '../firebase/firebase';

/**
 * USER signup with Google or Facebook 
 * After signup select region he/she wants to give an answer... USER_REGION_SELECTED = true
 * After that select categories..... USER_CATEGORY_SELECTED = true
 * 
 */

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
    this.state = {
      color: 'red',
      userIsOnCategory: false,
      foodSwitchIsOn: true,
      eventSwitchIsOn: true,
      hotelSwitchIsOn: true,
      funSwitchIsOn: true,
      surpriseSwitchIsOn: true,
    }
  }

  componentWillMount() {

    // Login durumda olan kullanıcı var mı kontrolü
    // Eğer yoksa kullanıcıyı signup sayfasına yönlendirecek.
    if(_.isEmpty(this.props.auth)) {
      this.props.navigation.navigate(routeConstants.ROUTE_SIGN_UP)
    }

    //GET Active User datas
    firebaseDatabase.ref(firebaseDbConstants.FIREBASE_DB_USERS+'/').child(this.props.auth.uid).on('value',(snapshot) => {

      //Get User info
      var user = snapshot.val();

      // Kullanıcı daha önce kayıt işlemini tamamlamış.
      // Değişiklik yapmak isterse profil sayfasından yapmalı
      if ( user.status === dataConstants.USER_REGISTERED_COMPLETE) {
        this.props.navigation.navigate(routeConstants.ROUTE_HOME)
      }

      //Find User Status
      if(user.status === dataConstants.USER_REGION_SELECTED) {
        // Kullanıcı bölge seçmiş ama kategori seçmemiş demektir.
        // Kullanıcının kategori seçmesi sağlanmalı.
        console.log("USER STATUS  =......"+dataConstants.USER_REGION_SELECTED)
        this.setState({ userIsOnCategory: true})
      } 


        var categories = snapshot.val().categories;

          if(categories.event) {
            this.setState({ eventSwitchIsOn: true })
          } else {
            this.setState({ eventSwitchIsOn: false })
          }


          if(categories.food) {
            this.setState({ foodSwitchIsOn: true })
          } else {
            this.setState({ foodSwitchIsOn: false })
          }


          if(categories.fun) {
            this.setState({ funSwitchIsOn: true })
          } else {
            this.setState({ funSwitchIsOn: false })
          }


          if(categories.hotel) {
            this.setState({ hotelSwitchIsOn: true })
          } else {
            this.setState({ hotelSwitchIsOn: false })
          }


          if(categories.surprise) {
            this.setState({ surpriseSwitchIsOn: true })
          } else {
            this.setState({ surpriseSwitchIsOn: false })
          }

      })
  }


    register = () => {

      firebaseDatabase.ref('users/').child(this.props.auth.uid).update({
          registered: true,
          categories: {
            fun: this.state.funSwitchIsOn,
            surprise: this.state.surpriseSwitchIsOn,
            event: this.state.eventSwitchIsOn,
            hotel: this.state.hotelSwitchIsOn,
            food: this.state.foodSwitchIsOn
          }
      })
      this.props.navigation.navigate(routeConstants.ROUTE_HOME)
    }


    render() {
      return ( 

          <View style={styles.container}>
              <Map style={styles.map}/>

              {this.displayJsxMessage()}

              <View style={styles.buttonWrapper}>
                <Button
                  buttonStyle={styles.buttonRegister}
                  title='OK'
                  onPress={this.register}
                />
              </View>
            </View>
        );
    }
              
    displayJsxMessage() {
      if (this.state.userIsOnCategory) {

          console.log("CATEGORY ALANINA GELMIS OLMALI")
          return (
              <View style={styles.categoryWrapper}>
                <View style={styles.categoryTopTextView}>
                  <Text style={styles.categoryTopText}> I can answer about</Text>
                </View>
                <View style={styles.categoryListWrapper}>
                  <Text>{dataConstants.QUESTION_TYPE_FOOD}
                    <Switch
                      onValueChange={(value) => this.setState({foodSwitchIsOn: value})}
                      onTintColor="#00ff00"
                      style={styles.categoryButton}
                      thumbTintColor="#0000ff"
                      tintColor="#ff0000"
                      value={this.state.foodSwitchIsOn}/>
                  </Text>
                  <Text>{dataConstants.QUESTION_TYPE_SURPRISE}
                    <Switch
                      onValueChange={(value) => this.setState({surpriseSwitchIsOn: value})}
                      onTintColor="#00ff00"
                      style={styles.categoryButton}
                      thumbTintColor="#0000ff"
                      tintColor="#ff0000"
                      value={this.state.surpriseSwitchIsOn}/>
                  </Text>
                  <Text>{dataConstants.QUESTION_TYPE_EVENT}
                    <Switch
                      onValueChange={(value) => this.setState({eventSwitchIsOn: value})}
                      onTintColor="#00ff00"
                      style={styles.categoryButton}
                      thumbTintColor="#0000ff"
                      tintColor="#ff0000"
                      value={this.state.eventSwitchIsOn}/>
                  </Text>
                  <Text>{dataConstants.QUESTION_TYPE_HOTEL}
                    <Switch
                      onValueChange={(value) => this.setState({hotelSwitchIsOn: value})}
                      onTintColor="#00ff00"
                      style={styles.categoryButton}
                      thumbTintColor="#0000ff"
                      tintColor="#ff0000"
                      value={this.state.hotelSwitchIsOn}/>
                  </Text>
                  <Text>{dataConstants.QUESTION_TYPE_FUN}
                    <Switch
                      onValueChange={(value) => this.setState({funSwitchIsOn: value})}
                      onTintColor="#00ff00"
                      style={styles.categoryButton}
                      thumbTintColor="#0000ff"
                      tintColor="#ff0000"
                      value={this.state.funSwitchIsOn}/>
                  </Text>
                </View>

                <View style={styles.categoryBottomTextView}>
                  <Text style={styles.categoryBottomText}> in this area</Text>
                </View>
              </View>
          );
      } else {
          return <Text> Goodbye, JSX! </Text>;
      }
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

const styles = StyleSheet.create({
  scrollView: {
      flex: 1,
      marginBottom: 50
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch'
      //backgroundColor: '#F5FCFF'
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
  categoryWrapper: {
    position: 'absolute',
    top: 15*vh,
    width: width*0.6,
    left: width*0.2,
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  categoryTopTextView: {
    position: 'relative',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  categoryTopText: {
    //position: 'relative',
    //alignItems: 'flex-start',
    width: width*0.6,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  categoryListWrapper: {
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
      left: width*0.1,
      right: width*0.1,
  },
  categoryButton: {
      marginBottom: 0.8*vh,
      marginTop: 0.8*vh,
      //marginLeft: 10,
      //marginRight: 10
      position: 'relative',
      borderRadius: 20,
      backgroundColor: '#FF3366',
  },
  categoryBottomTextView: {
    position: 'relative',
    top: 4*vh,
    borderTopWidth: 2,
    borderTopColor: 'black'
  },
  categoryBottomText: {
    //position: 'relative',
    //alignItems: 'flex-start',
    width: width*0.6,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
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
  buttonBackWrapper: {
    position: 'absolute',
    bottom: 5*vh
  },
  buttonBack: {
      position: 'relative',
      borderRadius: 100,
      left: (width/2)-(16*vh),
      backgroundColor: '#ccc',
      //margin-left: -17vh;
      width: 8*vh,
      height: 8*vh
  }
});
