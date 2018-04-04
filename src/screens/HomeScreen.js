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
    TextInput,
    Switch,
    KeyboardAvoidingView
} from 'react-native';
import { Icon, Button,SocialIcon, ButtonGroup } from 'react-native-elements';
import Map from '../components/Map';
import SearchLocation from '../components/SearchLocation';

import * as constants from '../constants/dataConstants';

const { width, height } = Dimensions.get('window');


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';

// FIREBASE RELATED ITEMS
import firebase,{ firebaseAuth,firebaseDatabase } from '../firebase/firebase';
import { _ } from 'lodash';
var moment = require('moment');

let vw = Dimensions.get('window').width /100;
let vh = Dimensions.get('window').height /100;


class HomeScreen extends Component {


  static navigationOptions = {
    title: 'AskQuestion',
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

      // Kullanıcı var mı kontrolü
      if(!_.isEmpty(this.props.auth)) {

        var userUid = this.props.auth.uid
        // insert question infos into QUESTIONS table
        var question = firebaseDatabase.ref('questions/').push();

        var dateTime = firebase.database.ServerValue.TIMESTAMP
        // New question created....
        question.set({
                askerUserId: userUid,
                content: this.state.question,
                location: this.props.location,
                createdAt: dateTime,
                createdAt2: moment(dateTime).format('DD MMMM YYYY, h:mm:ss a'),
                status: constants.QUESTION_STATUS_NEW,
                type: this.state.questionType

        });

        // insert questions infos into USERS table
        firebaseDatabase.ref('users/' + userUid).child('questions/').child(question.key).set("TRUE");

        // SEND Question to other users..
        this.sendQuestionToRandomUser(question.key,userUid);


        //this.giveAnswerToQuestion(question.key);

      } else {
        console.log("KULLANICI OLMADAN KAYIT ATILAMAZ")
      }

    }


    // Soruyu random seçilen kullanıcılara göndermek için kullanılacak.
    // Bu fonksiyon geliştirilip uygun adayların seçilmesi sağlanması gerekecek..
    // Cevap beklenen olarak seçilip kaydedilen kullanıcılara push mesajı gönderilecek.
    // Push mesaj için database trigger ile push gönderilecek firebase üzerinden
    sendQuestionToRandomUser(questionKey,questionOwnerUid) {

      console.log("Soru sorma aşamasına geldi")
      //GET Active Users
      firebaseDatabase.ref('users/').once('value').then( (snapshot) => {
        snapshot.forEach( (childSnapshot) => {

          //TODO geçici olarak herkese soruyu gönderelim. test amaçlı
          this.sendQuestion(questionKey,childSnapshot.key)

          // if(questionOwnerUid != childSnapshot.key ) {
          //   this.sendQuestion(questionKey,childSnapshot.key)
          //   console.log("Diğer kullanıcıları bulmak lazım şimdi de...."+childSnapshot.key );
          // }
        })
      })

    }

    // İlgili soruyu belirlenen kullanıcılara gönder
    sendQuestion(questionUid,answerUserUid) {
      // Seçilen kullanıcılara soru gönderilmeli ve ayrıca bu kullanıcılara notification iletmeliyiz..
      // Firebase notification kullanılabilir...
      firebaseDatabase.ref('users/' + answerUserUid).child('waitingAnswers/').child(questionUid).set({
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              status: constants.ANSWER_STATUS_WAITING,
              viewedBy: "FALSE"
      });

      //Soru domain içerisine de kimlerden cevap beklendiği bilgisini işle.
      firebaseDatabase.ref('questions/' + questionUid).child('waitingAnswers/').child(answerUserUid).set({
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              status: constants.ANSWER_STATUS_WAITING,
              viewedBy: "FALSE"
      });

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

    render() {
        return (
            <View style={styles.container}>
              <Map style={styles.map}/>
              <View style={styles.searchInputView}>
                <SearchLocation />
              </View>
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
                <KeyboardAvoidingView behavior="padding" style={styles.form}>
                  <TextInput style={styles.questionInput}
                    onChangeText={this.questionChange}
                    multiline={true}
                    value={this.state.question ? this.state.question : ''}
                    placeholder="Your Question..."
                    placeholderTextColor="white"
                    underlineColorAndroid="rgba(0, 0, 0, 0)"
                    numberOfLines={2}/>
                </KeyboardAvoidingView>
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  buttonStyle={styles.buttonAsk}
                  title='ASK'
                  onPress={this.askQuestion}
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
    auth: state.auth,
    location: state.location
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

var platformOffset = Platform.OS === 'ios' ? 0 : 10;

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
    },
    questionWrapper: {
        position: 'absolute',
        bottom: 15*vh,
        width: width,
        padding: 10
    },
    questionInput: {
        position: 'relative',
        alignItems: 'flex-start',
        backgroundColor: '#1F8BFF',
        color: '#ffffff',
        borderRadius: 10,
        fontSize: 18,
        padding: 20,
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10
    },
    buttonWrapper: {
      position: 'absolute',
      bottom: 3*vh
    },
    buttonAsk: {
        position: 'relative',
        borderRadius: 100,
        left: (width /2)-(6*vh),
        right: (width /2)-(6*vh),
        backgroundColor: '#FF3366',
        width: 12*vh,
        height: 12*vh
        //marginBottom: 150,
        //marginLeft: 10,
        //marginRight: 10,
        //bottom: 2*vh,
        //line-height: 12vh;
        //color: 'white'
        //margin-left: -6vh;
    },
    predefinedQuestionsWrapper: {
      position: 'relative',
      width: width,
      alignItems: 'flex-start'
    },
    predefinedQuestionRight: {
      alignItems: 'flex-end',
      position: 'relative',
      backgroundColor: '#85A1B9',
      color: 'white',
      padding: 1.5*vh,
      fontSize: 2.2*vh,
      borderRadius: 1*vh,
      marginTop: 2.5*vh
    },
    predefinedQuestionLeft: {
      alignItems: 'flex-start',
      position: 'relative',
      backgroundColor: '#85A1B9',
      color: 'white',
      padding: 1.5*vh,
      fontSize: 2.2*vh,
      borderRadius: 1*vh,
      marginTop: 2.5*vh
    },
    categoryWrapper: {
      position: 'absolute',
      top: 15*vh,
      width: width*0.6,
      left: width*0.2,
      alignItems: 'flex-start',
      backgroundColor: 'rgba(0, 0, 0, 0)'
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
    }
});