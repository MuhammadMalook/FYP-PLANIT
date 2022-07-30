// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1iXSZfvIe9EOAitmKz9s-Mf5MORWGofA",
    authDomain: "planit-firebase-e1077.firebaseapp.com",
    projectId: "planit-firebase-e1077",
    storageBucket: "planit-firebase-e1077.appspot.com",
    messagingSenderId: "566026339432",
    appId: "1:566026339432:web:89d7e4a1c45eabd97527dd"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth(app)

export {auth}