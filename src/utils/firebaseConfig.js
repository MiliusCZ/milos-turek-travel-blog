import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBqzic4hbagBY_73r8RelRzf-v1clhz-Ls",
    authDomain: "milos-turek-travel-blog.firebaseapp.com",
    databaseURL: "https://milos-turek-travel-blog.firebaseio.com",
    projectId: "milos-turek-travel-blog",
    storageBucket: "milos-turek-travel-blog.appspot.com",
    messagingSenderId: "444566586809"
};

var firebaseConfig = firebase.initializeApp(config);

export default firebaseConfig;
