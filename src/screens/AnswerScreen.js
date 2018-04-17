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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux/actions'

// FIREBASE RELATED ITEMS
import firebase,{ firebaseAuth,firebaseDatabase } from '../firebase/firebase';

import * as dataConstants from '../constants/dataConstants';
import * as firebaseDbConstants from '../constants/firebaseDbConstants';

import { _ } from 'lodash';
var moment = require('moment');

class AnswerScreen extends Component {

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

    // Soruyla ilgili cevap vermek istendiğinde
    giveAnswerToQuestion = () => {

      var questionId = this.state.questionId

      // Login durumda olan kullanıcı var mı kontrolü
      // Eğer yoksa kullanıcıyı signup sayfasına yönlendirecek.
      if(_.isEmpty(this.props.auth)) {
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
              <View style={styles.answerWrapper}>
                <TextInput style={styles.answer}
                  onChangeText={this.answerChange}
                  multiline={true}
                  value={this.state.answer ? this.state.answer : ''}
                  placeholder="Your Answer..."
                  placeholderTextColor="black"
                  underlineColorAndroid="rgba(0, 0, 0, 0)"
                  numberOfLines={2}/>
              </View>
              <Button
                style={styles.buttonAnswer}
                title='ANSWER'
                onPress={this.giveAnswerToQuestion}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(AnswerScreen);

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
    buttonAnswer: {
        position: 'absolute',
        borderRadius: 100,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10
    }
});
