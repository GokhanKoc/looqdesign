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
import { Button ,Divider} from 'react-native-elements';
import Map from '../components/Map';

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

import {firebaseDatabase, firebaseAuth } from '../firebase/firebase';

/**
 * USER signup with Google or Facebook 
 * After signup select region he/she wants to give an answer... USER_REGION_SELECTED = true
 * After that select categories..... USER_CATEGORY_SELECTED = true
 * 
 */

class RegisterScreen extends Component {

  static navigationOptions = {
    title: 'Register'
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
        this.props.navigation.navigate(routeConstants.ROUTE_QUESTION)
      }

      //Find User Status
      if(user.status === dataConstants.USER_REGION_SELECTED) {
        // Kullanıcı bölge seçmiş ama kategori seçmemiş demektir.
        // Kullanıcının kategori seçmesi sağlanmalı.
        this.setState({ userIsOnCategory: true})
      } 



        var categories = snapshot.val().categories;

        if(categories) {
          if(categories.event) {
            console.log("EVENT SWITCH ON TRUE")
            this.setState({ eventSwitchIsOn: true })
          } else {
            console.log("EVENT SWITCH ON FALSE"+categories.event)
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
        }
      })
  }


    register = () => {

      firebaseDatabase.ref(firebaseDbConstants.FIREBASE_DB_USERS+'/').child(this.props.auth.uid).update({
        [ firebaseDbConstants.FIREBASE_DB_USER_STATUS ]       : dataConstants.USER_REGISTERED_COMPLETE,
        [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORIES]    : {
          [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_FUN]        : this.state.funSwitchIsOn,
          [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_SURPRISE]   : this.state.surpriseSwitchIsOn,
          [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_EVENT]      : this.state.eventSwitchIsOn,
          [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_HOTEL]      : this.state.hotelSwitchIsOn,
          [ firebaseDbConstants.FIREBASE_DB_QUESTION_CATEGORY_FOOD]       : this.state.foodSwitchIsOn
        } 
      })
      this.props.navigation.navigate(routeConstants.ROUTE_QUESTION)
    }

    locationSelection = () => {

      firebaseDatabase.ref(firebaseDbConstants.FIREBASE_DB_USERS+'/').child(this.props.auth.uid).update({
        [ firebaseDbConstants.FIREBASE_DB_USER_STATUS ]       : dataConstants.USER_REGION_SELECTED,
      })
      this.setState({ userIsOnCategory: true})
    }


    onPressFoodButton = () => {
      this.setState({foodSwitchIsOn: !this.state.foodSwitchIsOn})
    }

    onPressSurpriseButton = () => {
      this.setState({surpriseSwitchIsOn: !this.state.surpriseSwitchIsOn})
    }

    onPressEventButton = () => {
      this.setState({eventSwitchIsOn: !this.state.eventSwitchIsOn})
    }

    onPressHotelButton = () => {
      this.setState({hotelSwitchIsOn: !this.state.hotelSwitchIsOn})
    }

    onPressFunButton = () => {
      this.setState({funSwitchIsOn: !this.state.funSwitchIsOn})
    }


    render() {
      return ( 

          <View style={styles.container}>
              <Map style={styles.map}/>
              {this.displayJsxMessage()}
          </View>
        );
    }
              
    displayJsxMessage() {
      if (this.state.userIsOnCategory) {
          return (
            <View style={styles.container}>
              <View style={styles.categoryWrapper}>
                <View style={styles.categoryTopTextView}>
                  <Text style={styles.categoryTopText}> I can answer about</Text>
                </View>
                <View style={styles.categoryListWrapper}>
                  <Button 
                        title={dataConstants.QUESTION_TYPE_FOOD} 
                        buttonStyle={[styles.categoryButton, this.state.foodSwitchIsOn ? styles.activeCategoryButton : styles.passiveCategoryButton ]}
                        onPress={this.onPressFoodButton}
                        color={ this.state.foodSwitchIsOn ? 'white' : 'black' }
                  />
                  <Button 
                        title={dataConstants.QUESTION_TYPE_SURPRISE} 
                        buttonStyle={[styles.categoryButton, this.state.surpriseSwitchIsOn ? styles.activeCategoryButton : styles.passiveCategoryButton ]}
                        onPress={this.onPressSurpriseButton}
                        color={ this.state.surpriseSwitchIsOn ? 'white' : 'black' }
                  />
                  <Button 
                        title={dataConstants.QUESTION_TYPE_EVENT} 
                        buttonStyle={[styles.categoryButton, this.state.eventSwitchIsOn ? styles.activeCategoryButton : styles.passiveCategoryButton ]}
                        onPress={this.onPressEventButton}
                        color={ this.state.eventSwitchIsOn ? 'white' : 'black' }
                  />
                  <Button 
                        title={dataConstants.QUESTION_TYPE_HOTEL} 
                        buttonStyle={[styles.categoryButton, this.state.hotelSwitchIsOn ? styles.activeCategoryButton : styles.passiveCategoryButton ]}
                        onPress={this.onPressHotelButton}
                        color={ this.state.hotelSwitchIsOn ? 'white' : 'black' }
                  />
                  <Button 
                        title={dataConstants.QUESTION_TYPE_FUN} 
                        buttonStyle={[styles.categoryButton, this.state.funSwitchIsOn ? styles.activeCategoryButton : styles.passiveCategoryButton ]}
                        onPress={this.onPressFunButton}
                        color={ this.state.funSwitchIsOn ? 'white' : 'black' }
                  />
                </View>

                <View style={styles.categoryBottomTextView}>
                  <Text style={styles.categoryBottomText}> in this area</Text>
                </View>
              </View>

              <View style={styles.buttonWrapper}>
                <Button
                  buttonStyle={styles.buttonRegister}
                  title='OK'
                  onPress={this.register}
                />
              </View>
            </View>
          );
      } else {
             return (
              <View style={styles.buttonWrapper}>
                <Button
                  buttonStyle={styles.buttonRegister}
                  title='CATEGORY'
                  onPress={this.locationSelection}
                />
              </View>
             )
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
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch'
  },
  map: {
      flex: 1,
      width: null,
      height: null,
  },
  categoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
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
      position: 'relative',
      borderRadius: 20,
      width: 0.3*width
  },
  activeCategoryButton: {
      backgroundColor: '#FF3366',
  },
  passiveCategoryButton: {
      backgroundColor: '#D3D3D3',
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
  button: {
    position: 'relative',
    width: '90%',
    left: '5%', 
    backgroundColor: '#ccc',
    borderRadius: 2,
    margin: 0.5 
  }

});
