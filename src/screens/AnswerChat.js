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
    TextInput
} from 'react-native';
import { Icon, Button,SocialIcon } from 'react-native-elements';
import Map from '../components/Map';

const { width, height } = Dimensions.get('window');

let vw = Dimensions.get('window').width /100;
let vh = Dimensions.get('window').height /100;


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux/actions'

// FIREBASE RELATED ITEMS
import firebase,{ firebaseAuth,firebaseDatabase } from '../firebase/firebase';

import * as dataConstants from '../constants/dataConstants';
import * as firebaseDbConstants from '../constants/firebaseDbConstants';
import * as routeConstants from '../constants/routeConstants';

import { _ } from 'lodash';
var moment = require('moment');

class AnswerChat extends Component {

  static navigationOptions = {
    title: 'Answer'
  }

    constructor(props){
        super(props);
        this.state = {
          searchText: null,
          questionId: '-LAGL3x-mAU-535FIXD-',
          answer: null
        }
    }

    async findChatRoomForThatAnswer(questionId) {

      var chatroom = null

      let snapshot = await firebaseDatabase.ref(firebaseDbConstants.FIREBASE_DB_USERS+'/' + this.props.auth.uid)
          .child(firebaseDbConstants.FIREBASE_DB_CHATROOMS+'/')
          .child(questionId)
          .once('value');

      if(snapshot.val()) {
          chatroom = Object.keys(snapshot.val())[0]
      }
      return chatroom;
    }

    isQuestionNotValid() {
      console.log("PEKİ BURAYA GELDIM MI ACABA")

      return true;
    }


    // Soruyla ilgili cevap vermek istendiğinde
    giveAnswerToQuestion = () => {

      var questionId = this.state.questionId

      // Login durumda olan kullanıcı var mı kontrolü
      // Eğer yoksa kullanıcıyı signup sayfasına yönlendirecek.
      if(_.isEmpty(this.props.auth)) {
        this.props.navigation.navigate(routeConstants.ROUTE_SIGN_UP)
       }

      //Sorunun kayıtlı ve hala cevap verilebilir durumda olup olmadığını kontrol etmek gerekiyor.
      if(this.isQuestionNotValid) {
        console.log("BURAYA GELDIM MI ACABA")
        this.props.navigation.navigate(routeConstants.ROUTE_SIGN_UP)
      }

        // Daha önceden yaratılmış bir chatRoom var mı? 
        // Yani bu soruya cevap mı veriliyor yoksa chat mi devam ediyor..
        // bir chatroom : Soruyu soran, Cevaplayan ve soru bazında unique olacak.
        this.findChatRoomForThatAnswer(questionId).then( (chatRoom) => {

          //Daha önceden chatroom yaratılıp yaratılmadığının kontrolü
          if(chatRoom) {
            // Soru soran ile cevaplayan arasında muhabbet devam ediyor demektir.
            console.log("Daha önceden yaratılmış bir chatRoom var");

          } else {
            //Soruya ilk defa cevap veriliyor demektir.
            console.log("Daha önceden yaratılmış bir chatRoom yok");

            // create ChatRoom for this question
            var newChatRoom = firebaseDatabase.ref(firebaseDbConstants.FIREBASE_DB_CHATROOMS+'/').push();
            chatRoom = newChatRoom.key

            newChatRoom.set({
                    [firebaseDbConstants.FIRABASE_DB_CHATROOM_STATUS]: [dataConstants.CHATROOM_STATUS_OPEN],
                    [firebaseDbConstants.FIREBASE_DB_CHATROOM_RELATED_QUESTION]: questionId,
                    [firebaseDbConstants.FIREBASE_DB_CHATROOM_CREATED_AT]: firebase.database.ServerValue.TIMESTAMP,
            });

            newChatRoom.child(firebaseDbConstants.FIREBASE_DB_CHATROOMS_MEMBERS+'/')
                       .set({ [firebaseDbConstants.FIREBASE_DB_CHATROOMS_MEMBER_USER_ID]: this.props.auth.uid});

            // Insert chatrooms info for this question
            firebaseDatabase.ref(firebaseDbConstants.FIREBASE_DB_QUESTIONS+'/' + questionId)
                .child(firebaseDbConstants.FIREBASE_DB_CHATROOMS+'/')
                .child(chatRoom)
                .set(dataConstants.CHATROOM_STATUS_OPEN);


            //Insert chatroom info for the userUid
            firebaseDatabase.ref(firebaseDbConstants.FIREBASE_DB_USERS+'/' + this.props.auth.uid)
                .child(firebaseDbConstants.FIREBASE_DB_CHATROOMS+'/')
                .child(questionId)
                .child(chatRoom)
                .set(dataConstants.CHATROOM_STATUS_OPEN);
          }

          // Insert messages into chatrooms
          var messageRef = firebaseDatabase.ref(firebaseDbConstants.FIREBASE_DB_CHATROOMS+'/' + chatRoom)
                                           .child(firebaseDbConstants.FIREBASE_DB_MESSAGES+'/')
                                           .push();

          messageRef.set({
            [firebaseDbConstants.FIREBASE_DB_MESSAGE_CONTENT]: this.state.answer,
            [firebaseDbConstants.FIREBASE_DB_MESSAGE_CREATED_AT] : firebase.database.ServerValue.TIMESTAMP,
            [firebaseDbConstants.FIREBASE_DB_MESSAGE_LOCATION] : this.props.location,
            [firebaseDbConstants.FIREBASE_DB_MESSAGE_SENDER]  : this.props.auth.uid,
            [firebaseDbConstants.FIREBASE_DB_MESSAGE_STATUS] : dataConstants.MESSAGE_STATUS_ACTIVE
          })
        })
    }

    answerChange = (answer) => {
      this.setState({
        answer: answer
      })
    }

    render() {
        return (
            <View style={styles.container}>
              <Map style={styles.map}/>

              <View style={styles.answerPin}>
                <View style={styles.pinUser}>
                  <Image style={styles.pinUserImg} 
                      source={{uri: 'http://bootstrap.gallery/everest-v3/img/user1.jpg'}}
                  />
                </View>
              </View>

              <View style={styles.questionGroup}>
                <View style={styles.askQuestion}>
                  <Text style={styles.askQuestionText}>
                    Pariatur aute voluptate excepteur nisi eu cupidatat consequat amet occaecat in qui.
                  </Text>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnswerChat);

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
    questionGroup: {
        position: 'absolute',
        bottom: 17*vh,
        width: width,
        padding: 1.5*vh
    },
    askQuestion: {
        position: 'relative',
        backgroundColor: '#1F8BFF',
        borderRadius: vh,
        padding: 1.5*vh,
        marginTop: 2.5*vh
    },
    askQuestionText: {
      fontSize: 2.2*vh,
      color: 'white'
    },
    answerPin: {
        position: 'absolute',
        top: .50*height,
        left: .025*width,
        width: .95*width,
        borderRadius: 0.5,
        backgroundColor: '#6600ff',
        zIndex: 10
    },
    pinUser: {
        position: 'absolute',
        width: 10*vh,
        height: 10*vh,
        left: 0.5*width,
        bottom: -3*vh,
        marginLeft: -5*vh,
        borderRadius: 50% 50% 50% 0,
        //transform: [rotateY: '-45deg'], 
        backgroundColor: '#6600ff' 
    },
    pinUserImg: {
        position: 'absolute',
        left: 0.05*width,
        top: 0.05*width,
        width: '90%',
        height: '90%'
    }
});
