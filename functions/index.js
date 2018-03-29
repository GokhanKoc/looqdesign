'use strict';

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



// User tarafından sorulan question sayısını hesaplar...
exports.questionCount = functions.database.ref("/users/{userId}/questions/{questionId}").onWrite((event) => {

  var collectionRef = event.data.ref.parent;
  var countRef = collectionRef.parent.child('firebase_questionCount');

  return countRef.transaction(function(current) {
    if (event.data.exists() && !event.data.previous.exists()) {
      return (current || 0) + 1;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      return (current || 0) - 1;
    }
  });
});


// User tarafından cevap verilecek soruların sayısını hesaplar...
exports.waitingAnswerCount = functions.database.ref("/users/{userId}/waitingAnswers/{answerId}").onWrite((event) => {

  var collectionRef = event.data.ref.parent;
  var countRef = collectionRef.parent.child('firebase_waitingAnswerCount');

  return countRef.transaction(function(current) {
    if (event.data.exists() && !event.data.previous.exists()) {
      return (current || 0) + 1;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      return (current || 0) - 1;
    }
  });
});

// User tarafından sorulan question sayısını hesaplar...
exports.messageCount = functions.database.ref("/users/{userId}/messages/{messageId}").onWrite((event) => {

  var collectionRef = event.data.ref.parent;
  var countRef = collectionRef.parent.child('firebase_messageCount');

  return countRef.transaction(function(current) {
    if (event.data.exists() && !event.data.previous.exists()) {
      return (current || 0) + 1;
    }
    else if (!event.data.exists() && event.data.previous.exists()) {
      return (current || 0) - 1;
    }
  });
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/users/{userId}/displayName')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.val();
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('uppercase').set(uppercase);
});


exports.manageRoomTopics = functions.database.ref('rooms/{room}/users/{user}')
    .onWrite(event => {

      let action = event.data.exists() ? 'deneme' : 'nodeneme';

    }
);
