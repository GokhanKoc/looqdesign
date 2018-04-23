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


import * as routeConstants from '../constants/routeConstants';
import * as firebaseDbConstants from '../constants/firebaseDbConstants';
import * as dataConstants from '../constants/dataConstants';


import { _ } from 'lodash';


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
      userIsOnCategory: true,
      foodSwitchIsOn: true,
      eventSwitchIsOn: true,
      hotelSwitchIsOn: true,
      funSwitchIsOn: true,
      surpriseSwitchIsOn: true,
    }
  }

  componentWillMount() {


  }


    register = () => {

    }

    locationSelection = () => {

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
              <View style={styles.buttonWrapper}>
                <Button
                  buttonStyle={styles.buttonRegister}
                  title={this.state.userIsOnCategory ? 'CATEGORY' : 'ASK' }
                  onPress={this.locationSelection}
                />
              </View>
          </View>
        );
    }
              
    displayJsxMessage() {
      if (this.state.userIsOnCategory) {
          return (
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
          );
      }
    }


}


export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch'
  },
  map: {
      flex: 1
  },
  categoryWrapper: {
      flex: 8,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'flex-end', 
  },
  buttonWrapper: {
      flex: 2,
      alignItems: 'center'
  },
  categoryTopTextView: {
    position: 'relative',
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  categoryListWrapper: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center'  
  },
  categoryBottomTextView: {
    position: 'relative',
    borderTopWidth: 2,
    borderTopColor: 'black'
  },
  categoryTopText: {
    width: width*0.6,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  categoryButton: {
      marginBottom: 0.8*vh,
      marginTop: 0.8*vh,
      borderRadius: 20,
      width: 0.3*width
  },
  activeCategoryButton: {
      backgroundColor: '#FF3366',
  },
  passiveCategoryButton: {
      backgroundColor: '#D3D3D3',
  },
  categoryBottomText: {
    width: width*0.6,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  buttonRegister: {
      position: 'relative',
      justifyContent: 'center',
      borderRadius: 100,
      backgroundColor: '#FF3366',
      width: 12*vh,
      height: 12*vh
  }
});
