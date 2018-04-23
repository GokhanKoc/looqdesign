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
    KeyboardAvoidingView
} from 'react-native';
import { Icon, Button,SocialIcon } from 'react-native-elements';
import Map from '../components/Map';

const { width, height } = Dimensions.get('window');

let vw = Dimensions.get('window').width /100;
let vh = Dimensions.get('window').height /100;


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

      return questionId;
    }

    isQuestionNotValid() {
      console.log("PEKİ BURAYA GELDIM MI ACABA")

      return true;
    }


    // Soruyla ilgili cevap vermek istendiğinde
    giveAnswerToQuestion = () => {

      console.log("BURAYA GELDIM MI ACABA")

    }

    answerChange = (answer) => {
      this.setState({
        answer: answer
      })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>

                  <TextInput
                      onChangeText={this.questionChange}
                      multiline={true}
                      value={this.state.question ? this.state.question : 'deneme deneme'}
                      placeholder="Your Question..."
                      placeholderTextColor="white"
                      underlineColorAndroid="rgba(0, 0, 0, 0)"
                      numberOfLines={2}/>

            </KeyboardAvoidingView>
        );
    }

}


export default AnswerChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    questionGroup: {
        position: 'absolute',
        bottom: 17*vh,
        width: width,
        padding: 1.5*vh
    }
});
