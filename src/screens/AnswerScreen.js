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


import * as dataConstants from '../constants/dataConstants';
import * as firebaseDbConstants from '../constants/firebaseDbConstants';
import * as routeConstants from '../constants/routeConstants';

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


export default AnswerScreen;

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
