import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAe5UFUdF1qIDUfm9DPHAmCDwgil8lcacU",
    authDomain: "studio-ghibli-fan-hub-db.firebaseapp.com",
    databaseURL: "https://studio-ghibli-fan-hub-db.firebaseio.com",
    projectId: "studio-ghibli-fan-hub-db",
    storageBucket: "studio-ghibli-fan-hub-db.appspot.com",
    messagingSenderId: "632826755813",
    appId: "1:632826755813:web:127f630e2e9743a2c8320c",
    measurementId: "G-J25DN1WV4K"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;