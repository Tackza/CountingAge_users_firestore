const firebase = require("firebase");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA-Z2Z0CUT3BHM48NOso-KJBmgqsYLrT8U",
  authDomain: "count-age.firebaseapp.com",
  databaseURL: "https://count-age.firebaseio.com",
  projectId: "count-age",
  storageBucket: "count-age.appspot.com",
  messagingSenderId: "606319636767",
  appId: "1:606319636767:web:76ef417d76f05e092b802a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default {
  firestore: firebase.firestore(),
};
