'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    View,
    Image,
    TextInput,
    Switch,
    KeyboardAvoidingView
} from 'react-native';
import { Icon, Button,SocialIcon, ButtonGroup } from 'react-native-elements';


import Map from '../components/Map';
import MapCircle from '../components/MapCircle';

import SearchLocation from '../components/SearchLocation';

import * as constants from '../constants/dataConstants';

const { width, height } = Dimensions.get('window');


import { _ } from 'lodash';
var moment = require('moment');

let vw = Dimensions.get('window').width /100;
let vh = Dimensions.get('window').height /100;

import * as firebaseDbConstants from '../constants/firebaseDbConstants';
import * as dataConstants from '../constants/dataConstants';


class QuestionScreen extends Component {


  static navigationOptions = {
    title: 'AskQuestion'
  }

    constructor(props){
        super(props);
        this.state = {
          searchText: null,
          question: null,
          answer: null,
          foodSwitchIsOn: false,
          eventSwitchIsOn: false,
          hotelSwitchIsOn: false,
          funSwitchIsOn: false,
          surpriseSwitchIsOn: true,
          questionType: null,
          selectedIndex: 2
        }
    }

    askQuestion = () => {


    }


    // Soruyu random seçilen kullanıcılara göndermek için kullanılacak.
    // Bu fonksiyon geliştirilip uygun adayların seçilmesi sağlanması gerekecek..
    // Cevap beklenen olarak seçilip kaydedilen kullanıcılara push mesajı gönderilecek.
    // Push mesaj için database trigger ile push gönderilecek firebase üzerinden
    sendQuestionToRandomUser(questionKey,questionOwnerUid) {


    }

    // İlgili soruyu belirlenen kullanıcılara gönder
    sendQuestion(questionUid,answerUserUid) {


    }


    questionChange = (question) => {
      this.setState({
        question: question
      })
    }


    categorySelected = (categoryType) => {

     switch(categoryType) {
        case constants.QUESTION_TYPE_FOOD:

          if(!this.state.foodSwitchIsOn){
            return this.setState({
              eventSwitchIsOn: false,
              hotelSwitchIsOn: false,
              funSwitchIsOn: false,
              surpriseSwitchIsOn: false,
              foodSwitchIsOn: !this.state.foodSwitchIsOn,
              questionType: constants.QUESTION_TYPE_FOOD
            })
          } else {
            return this.setState({
              eventSwitchIsOn: false,
              hotelSwitchIsOn: false,
              funSwitchIsOn: false,
              surpriseSwitchIsOn: true,
              foodSwitchIsOn: !this.state.foodSwitchIsOn,
              questionType: constants.QUESTION_TYPE_FOOD
            })
          }

        case constants.QUESTION_TYPE_EVENT:

          if(!this.state.eventSwitchIsOn){
            return this.setState({
              foodSwitchIsOn: false,
              eventSwitchIsOn: !this.state.eventSwitchIsOn,
              hotelSwitchIsOn: false,
              funSwitchIsOn: false,
              surpriseSwitchIsOn: false,
              questionType: constants.QUESTION_TYPE_EVENT
            })
          } else {
            return this.setState({
              foodSwitchIsOn: false,
              eventSwitchIsOn: !this.state.eventSwitchIsOn,
              hotelSwitchIsOn: false,
              funSwitchIsOn: false,
              surpriseSwitchIsOn: true,
              questionType: constants.QUESTION_TYPE_EVENT
            })
          }


        case constants.QUESTION_TYPE_SURPRISE:

          if(!this.state.surpriseSwitchIsOn){
            return this.setState({
              foodSwitchIsOn: false,
              eventSwitchIsOn: false,
              hotelSwitchIsOn: false,
              funSwitchIsOn: false,
              surpriseSwitchIsOn: !this.state.surpriseSwitchIsOn,
              questionType: constants.QUESTION_TYPE_SURPRISE
            })
          } else {
            return this.setState({
              foodSwitchIsOn: false,
              eventSwitchIsOn: false,
              hotelSwitchIsOn: false,
              funSwitchIsOn: false,
              surpriseSwitchIsOn: !this.state.surpriseSwitchIsOn,
              questionType: constants.QUESTION_TYPE_SURPRISE
            })
          }

        case constants.QUESTION_TYPE_FUN:

          if(!this.state.funSwitchIsOn){
            return this.setState({
              foodSwitchIsOn: false,
              eventSwitchIsOn: false,
              hotelSwitchIsOn: false,
              surpriseSwitchIsOn: false,
              funSwitchIsOn: !this.state.funSwitchIsOn,
              questionType: constants.QUESTION_TYPE_FUN
            })
          } else {
            return this.setState({
              foodSwitchIsOn: false,
              eventSwitchIsOn: false,
              hotelSwitchIsOn: false,
              surpriseSwitchIsOn: true,
              funSwitchIsOn: !this.state.funSwitchIsOn,
              questionType: constants.QUESTION_TYPE_FUN
            })
          }

        case constants.QUESTION_TYPE_HOTEL:
          if(!this.state.hotelSwitchIsOn){
            return this.setState({
              foodSwitchIsOn: false,
              eventSwitchIsOn: false,
              funSwitchIsOn: false,
              surpriseSwitchIsOn: false,
              hotelSwitchIsOn: !this.state.hotelSwitchIsOn,
              questionType: constants.QUESTION_TYPE_HOTEL
            })
          } else {
            return this.setState({
              foodSwitchIsOn: false,
              eventSwitchIsOn: false,
              funSwitchIsOn: false,
              surpriseSwitchIsOn: true,
              hotelSwitchIsOn: !this.state.hotelSwitchIsOn,
              questionType: constants.QUESTION_TYPE_HOTEL
            })
          }

        default:
          return this.setState({
            foodSwitchIsOn: false,
            eventSwitchIsOn: false,
            hotelSwitchIsOn: false,
            funSwitchIsOn: false,
            surpriseSwitchIsOn: true,
            questionType: constants.QUESTION_TYPE_SURPRISE
          }) ;
      }
    }


    changeState = (text) => {
      console.log("ACABA DOGRU MUDUR"+text);
    }


    updateIndex = (selectedIndex) => {
      this.setState({selectedIndex})
    }


    render() {

      const buttons = ['Hello', 'World', 'Buttons']
      const { selectedIndex } = this.state

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Map style={styles.map}/>
                <View style={styles.categoryWrapper}>
                  <View style={styles.categoryListWrapper}>

                    <Text>{constants.QUESTION_TYPE_FOOD}
                      <Switch
                        onValueChange={() => this.categorySelected(constants.QUESTION_TYPE_FOOD)}
                        onTintColor="#00ff00"
                        style={styles.categoryButton}
                        thumbTintColor="#0000ff"
                        tintColor="#ff0000"
                        value={this.state.foodSwitchIsOn}/>
                    </Text>
                    <Text>{constants.QUESTION_TYPE_SURPRISE}
                      <Switch
                        onValueChange={() => this.categorySelected(constants.QUESTION_TYPE_SURPRISE)}
                        onTintColor="#00ff00"
                        style={styles.categoryButton}
                        thumbTintColor="#0000ff"
                        tintColor="#ff0000"
                        value={this.state.surpriseSwitchIsOn}/>
                    </Text>
                    <Text>{constants.QUESTION_TYPE_EVENT}
                      <Switch
                        onValueChange={() => this.categorySelected(constants.QUESTION_TYPE_EVENT)}
                        onTintColor="#00ff00"
                        style={styles.categoryButton}
                        thumbTintColor="#0000ff"
                        tintColor="#ff0000"
                        value={this.state.eventSwitchIsOn}/>
                    </Text>
                    <Text>{constants.QUESTION_TYPE_HOTEL}
                      <Switch
                        onValueChange={() => this.categorySelected(constants.QUESTION_TYPE_HOTEL)}
                        onTintColor="#00ff00"
                        style={styles.categoryButton}
                        thumbTintColor="#0000ff"
                        tintColor="#ff0000"
                        value={this.state.hotelSwitchIsOn}/>
                    </Text>
                    <Text>{constants.QUESTION_TYPE_FUN}
                      <Switch
                        onValueChange={() => this.categorySelected(constants.QUESTION_TYPE_FUN)}
                        onTintColor="#00ff00"
                        style={styles.categoryButton}
                        thumbTintColor="#0000ff"
                        tintColor="#ff0000"
                        value={this.state.funSwitchIsOn}/>
                    </Text>
                  </View>
                </View>
                <View style={styles.questionWrapper}>
                  <View style={styles.predefinedQuestionsWrapper}>
                    <Text style={styles.predefinedQuestionLeft}>
                      SOL TARAF deneme dendemdemde
                    </Text>
                    <Text style={styles.predefinedQuestionRight}>
                      SAG TARAF hoppal
                    </Text>
                  </View>
                  <View style={styles.form}>
                    <TextInput style={styles.questionInput}
                      onChangeText={this.questionChange}
                      multiline={true}
                      value={this.state.question ? this.state.question : 'deneme deneme'}
                      placeholder="Your Question..."
                      placeholderTextColor="white"
                      underlineColorAndroid="rgba(0, 0, 0, 0)"
                      numberOfLines={2}/>
                  </View>
                </View>
                <View style={styles.buttonWrapper}>
                  <Button
                    buttonStyle={styles.buttonAsk}
                    title='ASK'
                    onPress={this.askQuestion}
                  />
                </View>
            </KeyboardAvoidingView>
        );
    }
}


export default QuestionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'    
    },
    map: {
        flex: 1
    },
    categoryWrapper: {
      flex: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    questionWrapper: {
      flex: 4
    },
    buttonWrapper: {
      flex: 2,
      alignItems: 'center'
    },
    categoryListWrapper: {
      position: 'relative',
      alignItems: 'center'
    },
    categoryButton: {
      borderRadius: 20
    }, 
    predefinedQuestionsWrapper: {
      flex: 4,
      flexDirection: 'column'
    },
    form: {
      flex: 2,
    },
    questionInput: {
        position: 'relative',
        alignItems: 'flex-start',
        backgroundColor: '#1F8BFF',
        color: '#ffffff',
        borderRadius: 10,
        fontSize: 18,
        padding: 20,
        margin: 10,
    },
    buttonAsk: {
        position: 'relative',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: '#FF3366',
        width: 12*vh,
        height: 12*vh
    },
    predefinedQuestionRight: {
      flex: 2,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      backgroundColor: '#85A1B9',
      color: 'white',
      padding: 1.5*vh,
      fontSize: 2.2*vh,
      borderRadius: 1*vh,
      marginLeft: 8*vh,
      marginTop: 2.5*vh
    },
    predefinedQuestionLeft: {
      flex: 2,
      alignItems: 'flex-start',
      position: 'relative',
      backgroundColor: '#85A1B9',
      color: 'white',
      padding: 1.5*vh,
      fontSize: 2.2*vh,
      borderRadius: 1*vh,
      marginRight: 8*vh,
      marginTop: 2.5*vh
    }
});


