import firebase from 'firebase/app'
import 'firebase/performance'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

// Initialize firebase
const config = {
    apiKey: "AIzaSyDLs3DwRPPGYB3E44xCjTjAO_BtPVO5SCk",
    authDomain: "moodtracking-a5513.firebaseapp.com",
    databaseURL: "https://moodtracking-a5513.firebaseio.com",
    projectId: "moodtracking-a5513",
    storageBucket: "moodtracking-a5513.appspot.com",
    messagingSenderId: "401126265609",
    appId: "1:401126265609:web:b078abe077b29f5d7b39d8",
}

// if (!firebase.apps.length) {
//   firebase.initializeApp(config)
// }

export default !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app()

// Initialize Performance Monitoring and get a reference to the service
// export const perf = firebase.performance()

export const db = firebase.firestore()
export const auth = firebase.auth()
