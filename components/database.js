import * as firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyD_nMiTID5gViQz3p0_fLfKgpOqM3JfwgM",
    authDomain: "bleezy-7a68e.firebaseapp.com",
    databaseURL: "https://bleezy-7a68e.firebaseio.com",
    projectId: "bleezy-7a68e",
    storageBucket: "bleezy-7a68e.appspot.com",
    messagingSenderId: "182701212453"
  };
  const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
  firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log('We are authenticated now!')
  }
  
  // Do other things
})
  
  export default firebaseApp