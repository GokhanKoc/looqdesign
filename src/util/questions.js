
import firebase,{ firebaseAuth,firebaseDatabase } from '../firebase/firebase';


export const addQuestion(location,question_type,question_content) => {
 {
    //Login olmuş kullanıcı
    if(firebaseAuth.currentUser) {

      // insert question infos into QUESTIONS table
      var question = firebaseDatabase.ref('questions/').push();

      // New question created....
      question.set({
              status: QuestionStatus.NEW,
              owner: userUid,
              latitude: location.lat(),
              longitude: location.lng(),
              content: question_content,
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              createdAt2: moment(firebase.database.ServerValue.TIMESTAMP).format("DD MMM YYYY hh:mm a"),
              type: question_type
      });

      // insert questions infos into USERS table
      firebaseDatabase.ref('users/' + userUid).child('questions/').child(question.key).set("TRUE");

      // SEND Question to other users..
      this.sendQuestionToRandomUser(question.key,userUid);

    }

}